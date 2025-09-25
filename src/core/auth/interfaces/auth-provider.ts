export interface AuthProvider {
  signIn(email: string, password: string): Promise<boolean>
  signOut(): Promise<void>
}
