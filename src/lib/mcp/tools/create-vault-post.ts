import { createClient } from "@supabase/supabase-js";
import { defineTool, type ToolContext } from "@lovable.dev/mcp-js";
import { z } from "zod";

function supabaseForUser(ctx: ToolContext) {
  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY!,
    {
      global: { headers: { Authorization: `Bearer ${ctx.getToken()}` } },
      auth: { persistSession: false, autoRefreshToken: false },
    },
  );
}

export default defineTool({
  name: "create_vault_post",
  title: "Create a Vault post",
  description:
    "Publish a new post to The Vault as the signed-in Aurora Elite member.",
  inputSchema: {
    content: z.string().trim().min(1).describe("Post body text."),
    destination: z.string().trim().optional().describe("Optional destination tag."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: false },
  handler: async ({ content, destination }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    const userId = ctx.getUserId()!;

    const { data: profile } = await supabase
      .from("profiles")
      .select("pseudonym")
      .eq("user_id", userId)
      .maybeSingle();

    const pseudonym = profile?.pseudonym ?? "Anonymous";

    const { data, error } = await supabase
      .from("vault_posts")
      .insert({ user_id: userId, pseudonym, content, destination: destination ?? null })
      .select()
      .single();

    if (error) {
      return { content: [{ type: "text", text: error.message }], isError: true };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(data) }],
      structuredContent: { post: data },
    };
  },
});
