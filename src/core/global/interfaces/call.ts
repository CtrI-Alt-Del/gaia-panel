export interface Call<Request = void> {
  getFormData(): Promise<Request>
  redirect(route: string): void
}
