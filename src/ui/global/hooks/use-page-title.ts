import { useLocation } from 'react-router'

const PAGE_TITLES: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/stations': 'Estações',
  '/parameters': 'Parâmetros',
  '/alerts': 'Alertas',
  '/reports': 'Relatórios',
  '/configuration': 'Configuração',
  '/profile': 'Perfil',
}

export function usePageTitle() {
  const location = useLocation()
  const currentPath = location.pathname

  return PAGE_TITLES[currentPath] || 'Dashboard'
}
