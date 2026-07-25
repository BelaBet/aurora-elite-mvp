import { auth, defineMcp } from "@lovable.dev/mcp-js";
import getProfileTool from "./tools/get-profile";
import listTravelHistoryTool from "./tools/list-travel-history";
import listVaultPostsTool from "./tools/list-vault-posts";
import createVaultPostTool from "./tools/create-vault-post";

const projectRef =
  import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "aurora-elite-mcp",
  title: "Aurora Elite",
  version: "0.1.0",
  instructions:
    "Tools for the Aurora Elite ultra-luxury travel app. Read the signed-in member's profile, travel history, and The Vault feed, and publish new Vault posts as that member.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [
    getProfileTool,
    listTravelHistoryTool,
    listVaultPostsTool,
    createVaultPostTool,
  ],
});
