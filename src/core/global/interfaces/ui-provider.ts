export interface UiProvider {
  isLoading: boolean
  reload(): Promise<void>
}
