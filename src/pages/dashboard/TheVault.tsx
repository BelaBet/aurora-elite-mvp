import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import {
  Heart,
  MessageCircle,
  Plus,
  MapPin,
  Send,
  X,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface VaultPost {
  id: string;
  pseudonym: string;
  content: string;
  destination: string | null;
  created_at: string;
  likes_count: number;
  comments_count: number;
  user_liked: boolean;
}

interface VaultComment {
  id: string;
  post_id: string;
  pseudonym: string;
  content: string;
  created_at: string;
}

const destinations = [
  "Aspen", "St. Tropez", "Maldives", "Monaco", "Dubai",
  "Ibiza", "Santorini", "Capri", "Mykonos", "Bora Bora"
];

const TheVault = () => {
  const { profile, user } = useAuth();
  const { toast } = useToast();
  const [posts, setPosts] = useState<VaultPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [showNewPost, setShowNewPost] = useState(false);
  const [newContent, setNewContent] = useState("");
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null);
  const [filterDestination, setFilterDestination] = useState<string | null>(null);
  const [posting, setPosting] = useState(false);

  // Comments state
  const [openComments, setOpenComments] = useState<string | null>(null);
  const [comments, setComments] = useState<Record<string, VaultComment[]>>({});
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [commentDraft, setCommentDraft] = useState("");
  const [sendingComment, setSendingComment] = useState(false);

  const fetchPosts = useCallback(async () => {
    if (!user) return;

    const { data: postsData, error } = await supabase
      .from("vault_posts")
      .select("id, pseudonym, content, destination, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching posts:", error);
      setLoadError(true);
      setLoading(false);
      return;
    }

    const ids = (postsData || []).map((p) => p.id);
    setLoadError(false);

    if (ids.length === 0) {
      setPosts([]);
      setLoading(false);
      return;
    }

    // Two aggregate queries instead of 3 per post (no N+1)
    const [{ data: likes }, { data: commentRows }] = await Promise.all([
      supabase.from("post_likes").select("post_id, user_id").in("post_id", ids),
      supabase.from("post_comments").select("post_id").in("post_id", ids),
    ]);

    const likeCount = new Map<string, number>();
    const liked = new Set<string>();
    (likes || []).forEach((l) => {
      likeCount.set(l.post_id, (likeCount.get(l.post_id) || 0) + 1);
      if (l.user_id === user.id) liked.add(l.post_id);
    });

    const commentCount = new Map<string, number>();
    (commentRows || []).forEach((c) => {
      commentCount.set(c.post_id, (commentCount.get(c.post_id) || 0) + 1);
    });

    setPosts(
      (postsData || []).map((post) => ({
        ...post,
        likes_count: likeCount.get(post.id) || 0,
        comments_count: commentCount.get(post.id) || 0,
        user_liked: liked.has(post.id),
      }))
    );
    setLoading(false);
  }, [user]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleCreatePost = async () => {
    if (!newContent.trim() || !profile) return;

    setPosting(true);
    const { error } = await supabase.from("vault_posts").insert({
      user_id: user!.id,
      pseudonym: profile.pseudonym,
      content: newContent,
      destination: selectedDestination,
    });

    if (error) {
      toast({
        title: "Erro",
        description: "Não foi possível criar o post.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Insight publicado",
        description: "Seu insight foi compartilhado no The Vault.",
      });
      setNewContent("");
      setSelectedDestination(null);
      setShowNewPost(false);
      fetchPosts();
    }
    setPosting(false);
  };

  const handleLike = async (postId: string, userLiked: boolean) => {
    if (!user) return;

    // Optimistic update
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              user_liked: !userLiked,
              likes_count: Math.max(0, p.likes_count + (userLiked ? -1 : 1)),
            }
          : p
      )
    );

    const { error } = userLiked
      ? await supabase
          .from("post_likes")
          .delete()
          .eq("post_id", postId)
          .eq("user_id", user.id)
      : await supabase.from("post_likes").insert({
          post_id: postId,
          user_id: user.id,
        });

    if (error) {
      console.error("Like error:", error);
      toast({
        title: "Erro",
        description: "Não foi possível registrar sua reação.",
        variant: "destructive",
      });
    }
    fetchPosts();
  };

  const loadComments = async (postId: string) => {
    setCommentsLoading(true);
    const { data, error } = await supabase
      .from("post_comments")
      .select("id, post_id, pseudonym, content, created_at")
      .eq("post_id", postId)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Comments error:", error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os comentários.",
        variant: "destructive",
      });
    } else {
      setComments((prev) => ({ ...prev, [postId]: data || [] }));
    }
    setCommentsLoading(false);
  };

  const toggleComments = (postId: string) => {
    if (openComments === postId) {
      setOpenComments(null);
      return;
    }
    setOpenComments(postId);
    setCommentDraft("");
    if (!comments[postId]) loadComments(postId);
  };

  const handleSendComment = async (postId: string) => {
    if (!commentDraft.trim() || !user || !profile) return;
    setSendingComment(true);

    const { data, error } = await supabase
      .from("post_comments")
      .insert({
        post_id: postId,
        user_id: user.id,
        pseudonym: profile.pseudonym,
        content: commentDraft.trim(),
      })
      .select("id, post_id, pseudonym, content, created_at")
      .single();

    if (error) {
      console.error("Comment insert error:", error);
      toast({
        title: "Erro",
        description: "Não foi possível enviar o comentário.",
        variant: "destructive",
      });
    } else {
      setComments((prev) => ({
        ...prev,
        [postId]: [...(prev[postId] || []), data],
      }));
      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId ? { ...p, comments_count: p.comments_count + 1 } : p
        )
      );
      setCommentDraft("");
    }
    setSendingComment(false);
  };

  const getInitials = (pseudonym: string) => {
    return pseudonym
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const visiblePosts = filterDestination
    ? posts.filter((p) => p.destination === filterDestination)
    : posts;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-gold" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-xl sm:text-2xl font-light tracking-widest mb-2">THE VAULT</h1>
        <p className="text-muted-foreground text-sm">
          Insights exclusivos da nossa comunidade
        </p>
      </div>

      {loadError && (
        <Card className="border-destructive/40">
          <CardContent className="p-4 flex items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">
              Não foi possível carregar o feed agora.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setLoading(true);
                fetchPosts();
              }}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Tentar de novo
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Destination Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {destinations.map((dest) => (
          <Badge
            key={dest}
            variant={filterDestination === dest ? "default" : "outline"}
            onClick={() =>
              setFilterDestination(filterDestination === dest ? null : dest)
            }
            className={cn(
              "cursor-pointer whitespace-nowrap hover:bg-gold/10 hover:border-gold/50 transition-colors",
              filterDestination === dest && "gold-gradient text-aurora-black border-0"
            )}
          >
            <MapPin className="h-3 w-3 mr-1" />
            {dest}
          </Badge>
        ))}
      </div>

      {filterDestination && (
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Filtrando por {filterDestination}</span>
          <button
            className="text-gold hover:underline"
            onClick={() => setFilterDestination(null)}
          >
            Limpar filtro
          </button>
        </div>
      )}

      {/* New Post Button / Form */}
      {showNewPost ? (
        <Card className="glass border-gold/20 animate-scale-in">
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gold">{profile?.pseudonym}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowNewPost(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <Textarea
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="Compartilhe um insight sobre sua última viagem..."
              className="min-h-[100px] bg-background/50 border-border/50 resize-none"
            />

            <div className="flex gap-2 flex-wrap">
              {destinations.map((dest) => (
                <Badge
                  key={dest}
                  variant={selectedDestination === dest ? "default" : "outline"}
                  className={cn(
                    "cursor-pointer",
                    selectedDestination === dest && "gold-gradient text-aurora-black border-0"
                  )}
                  onClick={() => setSelectedDestination(
                    selectedDestination === dest ? null : dest
                  )}
                >
                  {dest}
                </Badge>
              ))}
            </div>

            <Button
              onClick={handleCreatePost}
              disabled={!newContent.trim() || posting}
              className="w-full gold-gradient text-aurora-black"
            >
              {posting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Publicar Insight
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Button
          onClick={() => setShowNewPost(true)}
          className="w-full gold-gradient text-aurora-black h-12"
        >
          <Plus className="h-4 w-4 mr-2" />
          Compartilhar um Insight
        </Button>
      )}

      {/* Posts Feed */}
      <div className="space-y-4">
        {visiblePosts.map((post, index) => (
          <Card
            key={post.id}
            className="border-border/50 hover-lift"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <CardContent className="p-5">
              {/* Post Header */}
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="h-10 w-10 border border-gold/20">
                  <AvatarFallback className="bg-gold/10 text-gold text-xs">
                    {getInitials(post.pseudonym)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium text-sm">{post.pseudonym}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(post.created_at), {
                      addSuffix: true,
                      locale: ptBR,
                    })}
                  </p>
                </div>
                {post.destination && (
                  <Badge variant="secondary" className="text-xs">
                    <MapPin className="h-3 w-3 mr-1" />
                    {post.destination}
                  </Badge>
                )}
              </div>

              {/* Post Content */}
              <p className="text-foreground/90 leading-relaxed mb-4">
                {post.content}
              </p>

              {/* Post Actions */}
              <div className="flex items-center gap-4 pt-3 border-t border-border/50">
                <button
                  onClick={() => handleLike(post.id, post.user_liked)}
                  className={cn(
                    "flex items-center gap-2 text-sm transition-colors",
                    post.user_liked
                      ? "text-gold"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Heart
                    className={cn("h-4 w-4", post.user_liked && "fill-current")}
                  />
                  {post.likes_count}
                </button>
                <button
                  onClick={() => toggleComments(post.id)}
                  className={cn(
                    "flex items-center gap-2 text-sm transition-colors",
                    openComments === post.id
                      ? "text-gold"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <MessageCircle className="h-4 w-4" />
                  {post.comments_count}
                </button>
              </div>

              {/* Comments */}
              {openComments === post.id && (
                <div className="mt-4 space-y-3 border-t border-border/50 pt-4">
                  {commentsLoading && !comments[post.id] ? (
                    <div className="flex justify-center py-3">
                      <Loader2 className="h-4 w-4 animate-spin text-gold" />
                    </div>
                  ) : (
                    <>
                      {(comments[post.id] || []).length === 0 && (
                        <p className="text-xs text-muted-foreground">
                          Nenhum comentário ainda.
                        </p>
                      )}
                      {(comments[post.id] || []).map((c) => (
                        <div key={c.id} className="flex gap-3">
                          <Avatar className="h-8 w-8 border border-gold/10">
                            <AvatarFallback className="bg-gold/10 text-gold text-[10px]">
                              {getInitials(c.pseudonym)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-gold">{c.pseudonym}</p>
                            <p className="text-sm text-foreground/90 break-words">
                              {c.content}
                            </p>
                          </div>
                        </div>
                      ))}
                    </>
                  )}

                  <div className="flex gap-2 pt-1">
                    <Input
                      value={commentDraft}
                      onChange={(e) => setCommentDraft(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSendComment(post.id);
                        }
                      }}
                      placeholder="Escreva um comentário..."
                      className="bg-background/50 border-border/50"
                    />
                    <Button
                      size="icon"
                      onClick={() => handleSendComment(post.id)}
                      disabled={!commentDraft.trim() || sendingComment}
                      className="gold-gradient text-aurora-black shrink-0"
                    >
                      {sendingComment ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        {visiblePosts.length === 0 && !loadError && (
          <div className="text-center py-12 text-muted-foreground">
            <p>
              {filterDestination
                ? `Nenhum insight sobre ${filterDestination} ainda.`
                : "Nenhum insight compartilhado ainda."}
            </p>
            <p className="text-sm">Seja o primeiro a compartilhar!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TheVault;
