import { useNavigate } from 'react-router'
import { useCallback } from 'react'
import type { RouterProvider } from '@/core/global/interfaces/router-provider'

export function useRouter(): RouterProvider {
  const navigate = useNavigate()

  const goTo = useCallback(
    (route: string) => {
      navigate(route)
    },
    [navigate],
  )

  const goBack = useCallback(() => {
    navigate(-1)
  }, [navigate])

  return {
    goTo,
    goBack,
  }
}
