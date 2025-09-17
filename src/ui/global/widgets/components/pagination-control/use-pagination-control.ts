export type UsePaginationControlProps = {
  previousCursor: string | null
  nextCursor: string | null
  hasNextPage?: boolean
  hasPreviousPage?: boolean
}

export function usePaginationControl() {
  const buildUrl = (params: Record<string, string>) => {
    if (typeof window === 'undefined') {
      return '?'
    }

    const searchParams = new URLSearchParams(window.location.search)

    if (params.nextCursor && searchParams.get('previousCursor')) {
      searchParams.delete('previousCursor')
    }

    if (params.previousCursor && searchParams.get('nextCursor')) {
      searchParams.delete('nextCursor')
    }

    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        searchParams.set(key, value)
      } else {
        searchParams.delete(key)
      }
    })
    return `?${searchParams.toString()}`
  }

  return {
    buildUrl,
  }
}
