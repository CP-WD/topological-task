"use client";
import { Button } from "~/components/ui/button";
import { signInWithGithub } from "~/utils/db/supabase/auth/signIn";

export const SignInButton = () => {
  return <Button onClick={() => signInWithGithub()}>Sign in with Github</Button>;
};
