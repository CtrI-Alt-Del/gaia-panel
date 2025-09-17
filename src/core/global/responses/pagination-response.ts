type Props<Item> = {
  items: Item[]
  pageSize: number
  nextCursor: string | null
  previousCursor: string | null
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export class PaginationResponse<Item> {
  readonly items: Item[]
  readonly pageSize: number
  readonly nextCursor: string | null
  readonly previousCursor: string | null
  readonly hasNextPage: boolean
  readonly hasPreviousPage: boolean

  constructor({
    items,
    pageSize,
    nextCursor,
    previousCursor,
    hasNextPage,
    hasPreviousPage,
  }: Props<Item>) {
    this.items = items ?? []
    this.pageSize = pageSize
    this.nextCursor = nextCursor
    this.previousCursor = previousCursor
    this.hasNextPage = hasNextPage
    this.hasPreviousPage = hasPreviousPage
  }
}
