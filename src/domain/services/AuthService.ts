export interface AuthService {
  signIn(email: string, password: string): Promise<string>; // devuelve access_token
  signUp(email: string, password: string): Promise<void>;
  signOut(): Promise<void>;
}
