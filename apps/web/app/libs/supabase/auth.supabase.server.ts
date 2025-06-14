import { createSupabaseServerClient } from "~/libs/supabase/supabase.server";

export const signInWithGoogle = async (
  request: Request,
  supabaseUrl: string,
  supabaseAnonKey: string,
  AUTH_CALLBACK_URL: string,
) => {
  const supabase = createSupabaseServerClient(request, supabaseUrl, supabaseAnonKey);
  const { data, error } = await supabase.client.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: AUTH_CALLBACK_URL,
    },
  });

  return { 
    ok: !error && data ? true : false,
    data: data,
    error: error && !data ? error.message : "",
    headers: supabase.headers,
  };
};

export const signOut = async (
  request: Request,
  supabaseUrl: string,
  supabaseAnonKey: string,
  AUTH_SIGNOUT_URL: string,
) => {
  const supabase = createSupabaseServerClient(request, supabaseUrl, supabaseAnonKey);
  const { error } = await supabase.client.auth.signOut();

  return { 
    ok: !error ? true : false,
    data: { url: AUTH_SIGNOUT_URL }, 
    error: error ? error.message : "",
    headers: supabase.headers,
  };
};

export const getUser = async (
  request: Request,
  supabaseUrl: string,
  supabaseAnonKey: string,
) => {
  const supabase = createSupabaseServerClient(request, supabaseUrl, supabaseAnonKey);

  const {
    data: { user },
  } = await supabase.client.auth.getUser();

  return user ?? null;
};

export const isUserLoggedIn = async (
  request: Request,
  supabaseUrl: string,
  supabaseAnonKey: string,
) => {
  const supabase = createSupabaseServerClient(request, supabaseUrl, supabaseAnonKey);

  const {
    data: { user },
  } = await supabase.client.auth.getUser();

  return !!user;
};