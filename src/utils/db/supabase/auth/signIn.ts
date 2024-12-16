"use server";
// https://supabase.com/docs/guides/auth/social-login/auth-github?queryGroups=environment&environment=server&queryGroups=framework&framework=nextjs
import { redirect } from "next/navigation";
import { createClient } from "~/utils/db/supabase/client/server";
import { encodedRedirect } from "~/utils/encodedRedirect";
import { getWebBaseUrl } from "~/utils/url/getWebBaseUrl";

export const signInWithGithub = async () => {
  const supabase = createClient();
  const provider = "github";
  const WEB_BASE_URL = getWebBaseUrl();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${WEB_BASE_URL}/auth/callback`
    }
  });

  if (data.url) {
    return redirect(data.url);
  }

  if (error) {
    console.error(error);
    return encodedRedirect("error", "/sign-in", error.message);
  }

  return redirect("/protected");
};
