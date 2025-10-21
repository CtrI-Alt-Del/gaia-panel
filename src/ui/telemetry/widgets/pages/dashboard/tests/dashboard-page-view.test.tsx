global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
}
import { render, screen } from '@testing-library/react'
import { DashboardPageView } from '../dashboard-page-view'

describe('DashboardPageView', () => {
  const defaultProps = {
    stationsData: {
      totalStations: 1000,
      activeStationsPercentage: 99.8,
    },
    alertsData: {
      warningAlerts: 5,
      criticalAlerts: 2,
    },
    selectedStation: null,
    selectedPeriod: '7',
    selectedParameter: 'temperature',
    isLoading: false,
  }

  it('should render summary cards with correct values', () => {
    render(<DashboardPageView {...defaultProps} />)

    expect(screen.getByText('1000')).toBeInTheDocument()
    expect(screen.getByText('99.8%')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  it('should show zero when values are zero', () => {
    render(
      <DashboardPageView
        stationsData={{ totalStations: 0, activeStationsPercentage: 0 }}
        alertsData={{ warningAlerts: 0, criticalAlerts: 0 }}
        selectedStation={null}
        selectedPeriod={'7'}
        selectedParameter={'temperature'}
        isLoading={false}
      />
    )

    const zeros = screen.getAllByText('0')
    expect(zeros.length).toBe(3)
    expect(screen.getByText('0%')).toBeInTheDocument()
  })

  it('should render loading state if isLoading is true', () => {
    render(
      <DashboardPageView
        {...defaultProps}
        isLoading={true}
      />
    )
  })
})
