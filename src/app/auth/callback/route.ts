// https://supabase.com/docs/guides/auth/social-login/auth-github?queryGroups=environment&environment=server&queryGroups=framework&framework=nextjs
import { NextResponse } from "next/server";
import { REDIRECT_ROUTE_AFTER_SIGN_IN } from "~/constants/constants";
import { createClient } from "~/utils/db/supabase/client/server";
// The client you created from the Server-Side Auth instructions

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // if "next" is in param, use it as the redirect URL
  // const next = searchParams.get("next") ?? REDIRECT_ROUTE_AFTER_SIGN_IN;
  const next = REDIRECT_ROUTE_AFTER_SIGN_IN;
  console.log("code", code);
  console.log("next", next);
  console.log("origin", origin);
  console.log("next", next);

  if (code) {
    const supabase = createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    console.log("error", error);
    if (!error) {
      const forwardedHost = request.headers.get("x-forwarded-host"); // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === "development";
      if (isLocalEnv) {
        // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
