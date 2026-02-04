import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
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
  Loader2
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

const destinations = [
  "Aspen", "St. Tropez", "Maldives", "Monaco", "Dubai", 
  "Ibiza", "Santorini", "Capri", "Mykonos", "Bora Bora"
];

const TheVault = () => {
  const { profile, user } = useAuth();
  const { toast } = useToast();
  const [posts, setPosts] = useState<VaultPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewPost, setShowNewPost] = useState(false);
  const [newContent, setNewContent] = useState("");
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null);
  const [posting, setPosting] = useState(false);

  const fetchPosts = async () => {
    if (!user) return;

    const { data: postsData, error } = await supabase
      .from("vault_posts")
      .select(`
        id,
        pseudonym,
        content,
        destination,
        created_at
      `)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching posts:", error);
      return;
    }

    // Fetch likes count for each post
    const postsWithStats = await Promise.all(
      (postsData || []).map(async (post) => {
        const { count: likesCount } = await supabase
          .from("post_likes")
          .select("*", { count: "exact", head: true })
          .eq("post_id", post.id);

        const { count: commentsCount } = await supabase
          .from("post_comments")
          .select("*", { count: "exact", head: true })
          .eq("post_id", post.id);

        const { data: userLike } = await supabase
          .from("post_likes")
          .select("id")
          .eq("post_id", post.id)
          .eq("user_id", user.id)
          .maybeSingle();

        return {
          ...post,
          likes_count: likesCount || 0,
          comments_count: commentsCount || 0,
          user_liked: !!userLike,
        };
      })
    );

    setPosts(postsWithStats);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, [user]);

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

    if (userLiked) {
      await supabase
        .from("post_likes")
        .delete()
        .eq("post_id", postId)
        .eq("user_id", user.id);
    } else {
      await supabase.from("post_likes").insert({
        post_id: postId,
        user_id: user.id,
      });
    }
    fetchPosts();
  };

  const getInitials = (pseudonym: string) => {
    return pseudonym
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

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
        <h1 className="text-2xl font-light tracking-widest mb-2">THE VAULT</h1>
        <p className="text-muted-foreground text-sm">
          Insights exclusivos da nossa comunidade
        </p>
      </div>

      {/* Destination Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {destinations.map((dest) => (
          <Badge
            key={dest}
            variant="outline"
            className="cursor-pointer whitespace-nowrap hover:bg-gold/10 hover:border-gold/50 transition-colors"
          >
            <MapPin className="h-3 w-3 mr-1" />
            {dest}
          </Badge>
        ))}
      </div>

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
        {posts.map((post, index) => (
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
                <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <MessageCircle className="h-4 w-4" />
                  {post.comments_count}
                </button>
              </div>
            </CardContent>
          </Card>
        ))}

        {posts.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p>Nenhum insight compartilhado ainda.</p>
            <p className="text-sm">Seja o primeiro a compartilhar!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TheVault;
