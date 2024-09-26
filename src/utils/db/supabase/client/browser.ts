// https://supabase.com/docs/guides/auth/server-side/creating-a-client?queryGroups=framework&framework=nextjs&queryGroups=environment&environment=server
import { createBrowserClient } from "@supabase/ssr";

export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
