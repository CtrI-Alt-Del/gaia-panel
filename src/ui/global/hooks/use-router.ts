import { useLocation, useNavigate } from 'react-router'
import { useCallback, useEffect } from 'react'
import type { RouterProvider } from '@/core/global/interfaces/router-provider'

type Params = {
  onNavigate?: () => void
}

export function useRouter({ onNavigate }: Params = {}): RouterProvider {
  const navigate = useNavigate()
  const location = useLocation()

  const goTo = useCallback(
    (route: string) => {
      navigate(route)
    },
    [navigate],
  )

  const goBack = useCallback(() => {
    navigate(-1)
  }, [navigate])

  useEffect(() => {
    if (!onNavigate) {
      return
    }
    onNavigate()
  }, [location])

  return {
    goTo,
    goBack,
  }
}
