import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

// Local typed wrapper — supabase.auth.oauth is beta and may not be in the SDK's public types.
type OAuthClient = { name?: string; client_uri?: string };
type OAuthDetails = {
  client?: OAuthClient;
  redirect_url?: string;
  redirect_to?: string;
  scopes?: string[];
  requested_scopes?: string[];
};
type OAuthResp<T> = { data: T | null; error: { message: string } | null };
type OAuthApi = {
  getAuthorizationDetails: (id: string) => Promise<OAuthResp<OAuthDetails>>;
  approveAuthorization: (id: string) => Promise<OAuthResp<OAuthDetails>>;
  denyAuthorization: (id: string) => Promise<OAuthResp<OAuthDetails>>;
};
const oauth = (supabase.auth as unknown as { oauth: OAuthApi }).oauth;

const OAuthConsent = () => {
  const [params] = useSearchParams();
  const authorizationId = params.get("authorization_id") ?? "";
  const [details, setDetails] = useState<OAuthDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!authorizationId) {
        setError("Missing authorization_id");
        return;
      }
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) {
        const next = window.location.pathname + window.location.search;
        window.location.href = "/?next=" + encodeURIComponent(next);
        return;
      }
      const { data, error } = await oauth.getAuthorizationDetails(authorizationId);
      if (!active) return;
      if (error) {
        setError(error.message);
        return;
      }
      const immediate = data?.redirect_url ?? data?.redirect_to;
      if (immediate && !data?.client) {
        window.location.href = immediate;
        return;
      }
      setDetails(data);
    })();
    return () => {
      active = false;
    };
  }, [authorizationId]);

  const decide = async (approve: boolean) => {
    setBusy(true);
    const { data, error } = approve
      ? await oauth.approveAuthorization(authorizationId)
      : await oauth.denyAuthorization(authorizationId);
    if (error) {
      setBusy(false);
      setError(error.message);
      return;
    }
    const target = data?.redirect_url ?? data?.redirect_to;
    if (!target) {
      setBusy(false);
      setError("No redirect returned by the authorization server.");
      return;
    }
    window.location.href = target;
  };

  if (error) {
    return (
      <div className="min-h-screen bg-aurora-black flex items-center justify-center p-6">
        <div className="glass rounded-2xl p-8 max-w-md w-full border border-gold/20 text-white">
          <h1 className="text-xl font-light tracking-widest mb-3">Erro</h1>
          <p className="text-white/70 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  if (!details) {
    return (
      <div className="min-h-screen bg-aurora-black flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gold" />
      </div>
    );
  }

  const clientName = details.client?.name ?? "um aplicativo";
  const scopes = details.scopes ?? details.requested_scopes ?? [];

  return (
    <div className="min-h-screen bg-aurora-black flex items-center justify-center p-6">
      <div className="glass rounded-2xl p-8 md:p-10 max-w-md w-full border border-gold/20">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/10 mb-4">
            <span className="text-2xl font-light gold-text">AE</span>
          </div>
          <h1 className="text-2xl font-light text-white tracking-widest mb-2">
            Conectar {clientName}
          </h1>
          <div className="w-12 h-px bg-gold/50 mx-auto mb-4" />
          <p className="text-white/70 text-sm">
            {clientName} poderá usar as ferramentas do LV Concierge em seu nome enquanto você
            estiver conectado.
          </p>
        </div>

        {scopes.length > 0 && (
          <div className="mb-6 text-sm text-white/60">
            <p className="text-gold-muted text-xs tracking-wider uppercase mb-2">
              Permissões solicitadas
            </p>
            <ul className="space-y-1">
              {scopes.map((s) => (
                <li key={s}>• {s}</li>
              ))}
            </ul>
          </div>
        )}

        <p className="text-xs text-white/50 mb-6">
          Isto não substitui as políticas de segurança e privacidade do LV Concierge.
        </p>

        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1 h-12 border-white/20 text-white hover:bg-white/5"
            disabled={busy}
            onClick={() => decide(false)}
          >
            Recusar
          </Button>
          <Button
            className="flex-1 h-12 gold-gradient text-aurora-black font-medium tracking-wider"
            disabled={busy}
            onClick={() => decide(true)}
          >
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : "Aprovar"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OAuthConsent;
