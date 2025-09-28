export interface AuthProvider {
  signIn(email: string, password: string): Promise<boolean>
  signOut(): Promise<void>
  sendChangePasswordEmail(email: string): Promise<void>
  changePassword(password: string): Promise<void>
  verifyOtp(otp: string): Promise<boolean>
}
