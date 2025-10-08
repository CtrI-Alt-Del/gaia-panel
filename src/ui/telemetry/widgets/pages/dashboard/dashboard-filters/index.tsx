import { DashboardFiltersView, type DashboardFiltersViewProps } from './dashboard-filters-view'

export type DashboardFiltersProps = DashboardFiltersViewProps

export const DashboardFilters = (props: DashboardFiltersProps) => {
  return <DashboardFiltersView {...props} />
}

export default DashboardFilters
