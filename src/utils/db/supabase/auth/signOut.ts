"use server";
// https://supabase.com/docs/guides/auth/social-login/auth-github?queryGroups=environment&environment=server&queryGroups=framework&framework=nextjs
import { createClient } from "~/utils/db/supabase/client/server";

export const signOut = async () => {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error(error);
    return;
  }
};
