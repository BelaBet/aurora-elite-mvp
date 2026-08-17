import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { 
  Send, 
  Loader2,
  Sparkles,
  Calendar,
  Compass,
  Utensils
} from "lucide-react";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const quickActions = [
  { icon: Calendar, label: "Criar roteiro", prompt: "Crie um roteiro exclusivo de 5 dias para Maldivas com experiências de luxo." },
  { icon: Compass, label: "Descobrir destino", prompt: "Recomende um destino exclusivo para uma viagem romântica de aniversário." },
  { icon: Utensils, label: "Reservar experiência", prompt: "Sugira experiências gastronômicas exclusivas em Paris." },
];

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/concierge-chat`;

const Concierge = () => {
  const { profile } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: `Olá${profile?.pseudonym ? `, ${profile.pseudonym.split(" ")[0]}` : ""}! Sou seu concierge pessoal da LV Concierge. Como posso ajudá-lo a planejar sua próxima experiência extraordinária?`,
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageText,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    let assistantContent = "";

    const upsertAssistant = (nextChunk: string) => {
      assistantContent += nextChunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant" && last.id !== "welcome") {
          return prev.map((m, i) =>
            i === prev.length - 1 ? { ...m, content: assistantContent } : m
          );
        }
        return [
          ...prev,
          { id: Date.now().toString() + "-assistant", role: "assistant", content: assistantContent },
        ];
      });
    };

    try {
      const response = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: [...messages.filter(m => m.id !== "welcome"), userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (response.status === 429) {
        upsertAssistant("Estamos com alto volume de solicitações. Por favor, tente novamente em alguns instantes.");
        setIsLoading(false);
        return;
      }

      if (response.status === 402) {
        upsertAssistant("Serviço temporariamente indisponível. Por favor, tente novamente mais tarde.");
        setIsLoading(false);
        return;
      }

      if (!response.ok || !response.body) {
        throw new Error("Falha na conexão");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) upsertAssistant(content);
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      upsertAssistant("Desculpe, ocorreu um erro. Por favor, tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="max-w-3xl mx-auto h-[calc(100vh-12rem)] flex flex-col animate-fade-in">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gold/10 mb-3">
          <Sparkles className="h-6 w-6 text-gold" />
        </div>
        <h1 className="text-xl font-light tracking-widest">CONCIERGE AI</h1>
        <p className="text-muted-foreground text-sm">
          Seu assistente pessoal de viagens
        </p>
      </div>

      {/* Quick Actions */}
      {messages.length === 1 && (
        <div className="grid grid-cols-3 gap-3 mb-6">
          {quickActions.map(({ icon: Icon, label, prompt }) => (
            <Button
              key={label}
              variant="outline"
              className="h-auto py-4 flex-col gap-2 border-border/50 hover:border-gold/50 hover:bg-gold/5"
              onClick={() => sendMessage(prompt)}
            >
              <Icon className="h-5 w-5 text-gold" />
              <span className="text-xs">{label}</span>
            </Button>
          ))}
        </div>
      )}

      {/* Messages */}
      <Card className="flex-1 overflow-hidden border-border/50">
        <CardContent className="p-4 h-full overflow-y-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-3",
                message.role === "user" && "flex-row-reverse"
              )}
            >
              <Avatar className={cn(
                "h-8 w-8 shrink-0",
                message.role === "assistant" && "bg-gold/10"
              )}>
                <AvatarFallback className={cn(
                  "text-xs",
                  message.role === "assistant" ? "bg-gold/10 text-gold" : "bg-primary/10"
                )}>
                  {message.role === "assistant" ? "AE" : profile?.pseudonym?.slice(0, 2).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              
              <div
                className={cn(
                  "max-w-[80%] rounded-2xl px-4 py-3 text-sm",
                  message.role === "user"
                    ? "bg-gold text-aurora-black"
                    : "glass border border-border/50"
                )}
              >
                {message.role === "assistant" ? (
                  <div className="prose prose-sm max-w-none dark:prose-invert prose-p:my-1 prose-headings:my-2">
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                  </div>
                ) : (
                  <p>{message.content}</p>
                )}
              </div>
            </div>
          ))}
          
          {isLoading && messages[messages.length - 1]?.role === "user" && (
            <div className="flex gap-3">
              <Avatar className="h-8 w-8 shrink-0 bg-gold/10">
                <AvatarFallback className="bg-gold/10 text-gold text-xs">AE</AvatarFallback>
              </Avatar>
              <div className="glass border border-border/50 rounded-2xl px-4 py-3">
                <Loader2 className="h-4 w-4 animate-spin text-gold" />
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </CardContent>
      </Card>

      {/* Input */}
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="relative">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Como posso ajudá-lo hoje?"
            className="pr-12 h-12 bg-card border-border/50"
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="icon"
            disabled={!input.trim() || isLoading}
            className="absolute right-1 top-1 h-10 w-10 gold-gradient text-aurora-black"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Concierge;
