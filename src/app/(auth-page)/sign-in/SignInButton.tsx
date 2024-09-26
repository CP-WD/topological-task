"use client";
import { signInWithGithub } from "~/utils/db/supabase/auth/signIn";

export const SignInButton = () => {
  return <button onClick={() => signInWithGithub()}>Sign in with Github</button>;
};
