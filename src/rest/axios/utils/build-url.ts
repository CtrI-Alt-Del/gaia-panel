export function buildUrl(
  baseUrl: string,
  url: string,
  queryParams: Record<string, string | string[]>,
): string {
  const fullUrl = baseUrl ? `${baseUrl}${url}` : url
  const urlObj = new URL(fullUrl)

  Object.entries(queryParams).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => {
        urlObj.searchParams.append(key, v)
      })
    } else {
      urlObj.searchParams.set(key, value)
    }
  })

  return urlObj.toString()
}
