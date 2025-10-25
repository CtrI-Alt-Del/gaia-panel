import { useQueryParamString } from '@/ui/global/hooks'

export function useParametersSelect() {
  const [parameterId, setParameterId] = useQueryParamString('parameterId')

  function handleChange(value: string) {
    setParameterId(value)
  }

  return {
    parameterId,
    handleChange,
  }
}
