import { createClient } from "~/utils/db/supabase/client/server";

export const getUserId = async (): Promise<string> => {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  const userId = user?.id;
  if (!userId) {
    throw new Error("User is not authenticated");
  }
  return userId;
};
