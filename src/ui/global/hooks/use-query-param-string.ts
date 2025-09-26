import { useQueryState } from 'nuqs'

export function useQueryParamString(
  key: string,
  defaultString = '',
): [string, (newValue: string) => void] {
  const [string, setString] = useQueryState(key)

  function setState(newString: string) {
    setString(newString)
  }

  return [string ?? defaultString, setState]
}
