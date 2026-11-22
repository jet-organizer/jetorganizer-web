import "server-only";

import { auth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";

export async function createSupabaseClient() {
  const url = process.env.SUPABASE_URL;
  const publishableKey = process.env.SUPABASE_PUBLISHABLE_KEY;

  if (!url || !publishableKey) {
    throw new Error("Configure SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY to access the database.");
  }

  const session = await auth();
  const token = session.isAuthenticated ? await session.getToken() : null;

  if (!token) {
    throw new Error("A Clerk session is required to access the database.");
  }

  return createClient(url, publishableKey, { accessToken: async () => token });
}
