import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Lock, ArrowRight, CheckCircle } from "lucide-react";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if we have a valid session from the recovery link
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Link inválido",
          description: "O link de recuperação expirou ou é inválido.",
          variant: "destructive",
        });
        navigate("/");
      }
    };
    checkSession();
  }, [navigate, toast]);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem.",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Erro",
        description: "A senha deve ter pelo menos 6 caracteres.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) throw error;

      setSuccess(true);
      toast({
        title: "Senha atualizada",
        description: "Sua senha foi alterada com sucesso.",
      });

      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
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
        <div className="glass rounded-2xl p-8 md:p-12 border border-gold/20">
          {/* Logo */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/10 mb-6">
              <span className="text-2xl font-light gold-text">AE</span>
            </div>
            <h1 className="text-3xl font-light text-white tracking-widest mb-2">
              LV CONCIERGE
            </h1>
            <div className="w-12 h-px bg-gold/50 mx-auto mb-4" />
            <p className="text-silk text-sm tracking-wider">
              {success ? "Senha atualizada" : "Criar nova senha"}
            </p>
          </div>

          {success ? (
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-4">
                <CheckCircle className="h-8 w-8 text-green-400" />
              </div>
              <p className="text-silk">
                Redirecionando para o dashboard...
              </p>
            </div>
          ) : (
            <form onSubmit={handleResetPassword} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-silk text-xs tracking-wider uppercase">
                  Nova Senha
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

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-silk text-xs tracking-wider uppercase">
                  Confirmar Senha
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-silk" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                    Atualizar Senha
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          )}

          {/* Decorative line */}
          <div className="mt-8 flex items-center gap-4">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-silk/50 text-xs">SEGURO</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
