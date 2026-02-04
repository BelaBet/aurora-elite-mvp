import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Mail, Lock, ArrowRight } from "lucide-react";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        navigate("/dashboard");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
          },
        });
        if (error) throw error;
        toast({
          title: "Convite enviado",
          description: "Verifique seu email para confirmar sua conta.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-aurora-black flex items-center justify-center p-6">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md animate-fade-in">
        {/* VIP Invitation Card */}
        <div className="glass rounded-2xl p-8 md:p-12 border border-gold/20">
          {/* Logo */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/10 mb-6">
              <span className="text-2xl font-light gold-text">AE</span>
            </div>
            <h1 className="text-3xl font-light text-white tracking-widest mb-2">
              AURORA ELITE
            </h1>
            <div className="w-12 h-px bg-gold/50 mx-auto mb-4" />
            <p className="text-silk text-sm tracking-wider">
              {isLogin ? "Bem-vindo de volta" : "Você foi convidado"}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleAuth} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-silk text-xs tracking-wider uppercase">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-silk" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-silk/50 focus:border-gold/50 focus:ring-gold/20"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-silk text-xs tracking-wider uppercase">
                Senha
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-silk" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-silk/50 focus:border-gold/50 focus:ring-gold/20"
                  required
                  minLength={6}
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full gold-gradient text-aurora-black font-medium tracking-wider hover:opacity-90 transition-opacity h-12"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  {isLogin ? "Entrar" : "Criar Conta"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          {/* Toggle */}
          <div className="mt-8 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-silk text-sm hover:text-gold transition-colors"
            >
              {isLogin ? "Não tem conta? Solicite seu convite" : "Já possui acesso? Entre aqui"}
            </button>
          </div>

          {/* Decorative line */}
          <div className="mt-8 flex items-center gap-4">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-silk/50 text-xs">EXCLUSIVO</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>
        </div>

        {/* Footer text */}
        <p className="text-center text-silk/40 text-xs mt-6 tracking-wider">
          Acesso restrito a membros convidados
        </p>
      </div>
    </div>
  );
};

export default Login;
