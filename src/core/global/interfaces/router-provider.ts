export interface RouterProvider {
  goTo(route: string): void
  goBack(): void
}
