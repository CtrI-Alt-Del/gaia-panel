import { useLocation } from 'react-router'

const PAGE_TITLES: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/stations': 'Estações',
  '/parameters': 'Parâmetros',
  '/alarms': 'Alarmes',
  '/reports': 'Relatórios',
  '/configuration': 'Configuração',
  '/profile': 'Perfil',
}

export function usePageTitle() {
  const location = useLocation()
  const currentPath = location.pathname
  if (currentPath.startsWith('/stations/') && currentPath !== '/stations') {
    return 'Detalhes da Estação'
  }

  return PAGE_TITLES[currentPath] || 'Dashboard'
}
