import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Camera, Loader2, Save } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const Profile = () => {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [pseudonym, setPseudonym] = useState(profile?.pseudonym || "");
  const [bio, setBio] = useState(profile?.bio || "");
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url || "");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Sync local form state once the async profile arrives
  useEffect(() => {
    if (!profile || hydrated) return;
    setPseudonym(profile.pseudonym || "");
    setBio(profile.bio || "");
    setAvatarUrl(profile.avatar_url || "");
    setHydrated(true);
  }, [profile, hydrated]);

  const initials = pseudonym
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "LV";

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Por favor, selecione uma imagem válida");
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error("A imagem deve ter no máximo 2MB");
      return;
    }

    setUploading(true);

    try {
      const fileExt = file.name.split(".").pop();
      const filePath = `${user.id}/avatar.${fileExt}`;

      // Upload file to storage
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      // Add cache buster to force refresh
      const urlWithCacheBuster = `${publicUrl}?t=${Date.now()}`;
      setAvatarUrl(urlWithCacheBuster);
      toast.success("Avatar atualizado!");
    } catch (error: any) {
      console.error("Upload error:", error);
      toast.error("Erro ao fazer upload da imagem");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!user || !profile) return;

    if (!pseudonym.trim()) {
      toast.error("O pseudônimo é obrigatório");
      return;
    }

    setSaving(true);

    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          pseudonym: pseudonym.trim(),
          bio: bio.trim() || null,
          avatar_url: avatarUrl || null,
        })
        .eq("user_id", user.id);

      if (error) throw error;

      toast.success("Perfil atualizado com sucesso!");
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Save error:", error);
      toast.error("Erro ao salvar perfil");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
        <div className="flex items-center justify-between h-16 px-6 max-w-7xl mx-auto">
          <button 
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm">Voltar</span>
          </button>
          <h1 className="text-lg font-light tracking-widest">MEU PERFIL</h1>
          <div className="w-16" />
        </div>
      </header>

      {/* Content */}
      <main className="pt-24 pb-8 px-6 max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Avatar Section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative group">
              <Avatar className="h-32 w-32 border-4 border-gold/30">
                <AvatarImage src={avatarUrl || undefined} />
                <AvatarFallback className="bg-gold/10 text-gold text-2xl">
                  {initials}
                </AvatarFallback>
              </Avatar>
              
              <button
                onClick={handleAvatarClick}
                disabled={uploading}
                className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                {uploading ? (
                  <Loader2 className="h-8 w-8 text-gold animate-spin" />
                ) : (
                  <Camera className="h-8 w-8 text-gold" />
                )}
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
            
            <p className="text-sm text-muted-foreground">
              Clique para alterar o avatar
            </p>
          </div>

          {/* Form */}
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="pseudonym" className="text-sm text-muted-foreground">
                Pseudônimo
              </Label>
              <Input
                id="pseudonym"
                value={pseudonym}
                onChange={(e) => setPseudonym(e.target.value)}
                placeholder="Seu nome exclusivo"
                className="glass border-border/50 focus:border-gold/50"
              />
              <p className="text-xs text-muted-foreground">
                Este é o nome que aparece para outros membros
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio" className="text-sm text-muted-foreground">
                Bio
              </Label>
              <Textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Conte um pouco sobre você..."
                rows={4}
                className="glass border-border/50 focus:border-gold/50 resize-none"
              />
              <p className="text-xs text-muted-foreground">
                Máximo de 200 caracteres
              </p>
            </div>

            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">Email</Label>
              <Input
                value={user?.email || ""}
                disabled
                className="bg-muted/50 text-muted-foreground"
              />
              <p className="text-xs text-muted-foreground">
                O email não pode ser alterado
              </p>
            </div>
          </div>

          {/* Save Button */}
          <Button
            onClick={handleSave}
            disabled={saving}
            className="w-full bg-gold hover:bg-gold/90 text-background font-medium"
          >
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Salvando...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Salvar Alterações
              </>
            )}
          </Button>
        </motion.div>
      </main>
    </div>
  );
};

export default Profile;
