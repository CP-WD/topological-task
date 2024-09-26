// https://supabase.com/docs/guides/auth/server-side/creating-a-client?queryGroups=framework&framework=nextjs&queryGroups=environment&environment=server
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { Database } from "~/utils/db/supabase/database.types";

export const createClient = () => {
  const cookieStore = cookies();

  // 型定義: https://supabase.com/docs/guides/api/rest/generating-types
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        }
      }
    }
  );
};
