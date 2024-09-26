// https://supabase.com/docs/guides/auth/server-side/creating-a-client?queryGroups=framework&framework=nextjs&queryGroups=environment&environment=server
import { createBrowserClient } from "@supabase/ssr";
import { Database } from "~/utils/db/supabase/database.types";

export const createClient = () =>
  // 型定義: https://supabase.com/docs/guides/api/rest/generating-types
  createBrowserClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
