import { supabase } from "../config/supabaseClient";

export class AuthServiceImpl {
  async signUp(email: string, password: string): Promise<void> {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) throw new Error(error.message);
  }

  async signIn(email: string, password: string): Promise<string> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error || !data.session?.access_token) {
      throw new Error(error?.message || "Credenciales inválidas");
    }
    return data.session.access_token;
  }
}
