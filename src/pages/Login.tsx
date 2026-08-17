import { useState, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Mail, Lock, ArrowRight, ArrowLeft, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const Login = () => {
  const [mode, setMode] = useState<"login" | "signup" | "forgot">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  // Same-origin relative path for post-login redirect (e.g. OAuth consent flow).
  const rawNext = searchParams.get("next");
  const nextPath =
    rawNext && rawNext.startsWith("/") && !rawNext.startsWith("//") ? rawNext : null;
  const postLoginTarget = nextPath ?? "/dashboard";
  const signupRedirect = nextPath
    ? `${window.location.origin}${nextPath}`
    : window.location.origin;

  const passwordStrength = useMemo(() => {
    if (!password) return { level: 0, label: "", color: "" };
    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 10) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 1) return { level: 1, label: "Fraca", color: "bg-red-500" };
    if (score <= 2) return { level: 2, label: "Razoável", color: "bg-orange-500" };
    if (score <= 3) return { level: 3, label: "Boa", color: "bg-yellow-500" };
    if (score <= 4) return { level: 4, label: "Forte", color: "bg-emerald-500" };
    return { level: 5, label: "Excelente", color: "bg-emerald-400" };
  }, [password]);

  const passwordsMatch = confirmPassword === "" || password === confirmPassword;

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === "signup") {
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
    }

    setLoading(true);

    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        navigate(postLoginTarget);
      } else if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: signupRedirect,
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

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      toast({
        title: "Email enviado",
        description: "Verifique sua caixa de entrada para redefinir sua senha.",
      });
      setMode("login");
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

  const switchMode = (newMode: "login" | "signup" | "forgot") => {
    setMode(newMode);
    setPassword("");
    setConfirmPassword("");
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const getTitle = () => {
    switch (mode) {
      case "login":
        return "Bem-vindo de volta";
      case "signup":
        return "Crie sua conta exclusiva";
      case "forgot":
        return "Recuperar acesso";
    }
  };

  const getSubtitle = () => {
    switch (mode) {
      case "login":
        return null;
      case "signup":
        return "Preencha seus dados para solicitar seu convite";
      case "forgot":
        return null;
    }
  };

  const inputClass = "pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-gold/50 focus:ring-gold/20 h-12";

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
              LV CONCIERGE
            </h1>
            <div className="w-12 h-px bg-gold/50 mx-auto mb-4" />
            <p className="text-white/70 text-sm tracking-wider">
              {getTitle()}
            </p>
            {getSubtitle() && (
              <p className="text-white/50 text-xs tracking-wider mt-2">
                {getSubtitle()}
              </p>
            )}
          </div>

          {/* Forgot Password Form */}
          {mode === "forgot" ? (
            <form onSubmit={handleForgotPassword} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gold-muted text-xs tracking-wider uppercase font-medium">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gold-muted" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    className={inputClass}
                    required
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
                    Enviar Link
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>

              <button
                type="button"
                onClick={() => switchMode("login")}
                className="w-full flex items-center justify-center gap-2 text-white/70 text-sm hover:text-gold transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar ao login
              </button>
            </form>
          ) : (
            <>
              {/* Login/Signup Form */}
              <form onSubmit={handleAuth} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gold-muted text-xs tracking-wider uppercase font-medium">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gold-muted" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seu@email.com"
                      className={inputClass}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-gold-muted text-xs tracking-wider uppercase font-medium">
                      Senha
                    </Label>
                    {mode === "login" && (
                      <button
                        type="button"
                        onClick={() => switchMode("forgot")}
                        className="text-gold text-sm font-medium hover:text-gold/80 hover:underline transition-colors"
                      >
                        Esqueceu a senha?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gold-muted" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className={inputClass}
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gold-muted hover:text-gold transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>

                  {/* Password strength indicator - only in signup */}
                  {mode === "signup" && password && (
                    <div className="space-y-1.5 animate-fade-in">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div
                            key={i}
                            className={cn(
                              "h-1 flex-1 rounded-full transition-all duration-300",
                              i <= passwordStrength.level ? passwordStrength.color : "bg-white/10"
                            )}
                          />
                        ))}
                      </div>
                      <p className={cn(
                        "text-xs transition-colors",
                        passwordStrength.level <= 1 ? "text-red-400" :
                        passwordStrength.level <= 2 ? "text-orange-400" :
                        passwordStrength.level <= 3 ? "text-yellow-400" :
                        "text-emerald-400"
                      )}>
                        Força: {passwordStrength.label}
                      </p>
                    </div>
                  )}
                </div>

                {/* Confirm Password - only in signup */}
                {mode === "signup" && (
                  <div className="space-y-2 animate-fade-in">
                    <Label htmlFor="confirmPassword" className="text-gold-muted text-xs tracking-wider uppercase font-medium">
                      Confirmar Senha
                    </Label>
                    <div className="relative">
                      <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gold-muted" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className={cn(
                          inputClass,
                          confirmPassword && !passwordsMatch && "border-red-500/50 focus:border-red-500/50"
                        )}
                        required
                        minLength={6}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gold-muted hover:text-gold transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    {confirmPassword && !passwordsMatch && (
                      <p className="text-xs text-red-400 animate-fade-in">
                        As senhas não coincidem
                      </p>
                    )}
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={loading || (mode === "signup" && (!passwordsMatch || !confirmPassword))}
                  className="w-full gold-gradient text-aurora-black font-medium tracking-wider hover:opacity-90 transition-opacity h-12"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      {mode === "login" ? "Entrar" : "Criar Conta"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>

              {/* Toggle */}
              <div className="mt-8 text-center">
                <button
                  onClick={() => switchMode(mode === "login" ? "signup" : "login")}
                  className="text-white/70 text-sm hover:text-gold transition-colors"
                >
                  {mode === "login" ? "Não tem conta? Solicite seu convite" : "Já possui acesso? Entre aqui"}
                </button>
              </div>
            </>
          )}

          {/* Decorative line */}
          <div className="mt-8 flex items-center gap-4">
            <div className="flex-1 h-px bg-white/20" />
            <span className="text-white/50 text-xs">EXCLUSIVO</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>
        </div>

        {/* Footer text */}
        <p className="text-center text-white/50 text-xs mt-6 tracking-wider">
          Acesso restrito a membros convidados
        </p>
      </div>
    </div>
  );
};

export default Login;
