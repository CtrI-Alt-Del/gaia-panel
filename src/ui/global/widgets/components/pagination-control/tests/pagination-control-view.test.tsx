import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router'

import { PaginationControlView } from '../pagination-control-view'

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('PaginationControlView', () => {
  const mockOnBuildUrl = vi.fn((params: Record<string, string>) => {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        searchParams.set(key, value)
      }
    })
    return `?${searchParams.toString()}`
  })

  beforeEach(() => {
    mockOnBuildUrl.mockClear()
  })

  it('should render both navigation buttons', () => {
    renderWithRouter(
      <PaginationControlView
        previousCursor='prev123'
        nextCursor='next456'
        hasNextPage={true}
        hasPreviousPage={true}
        onBuildUrl={mockOnBuildUrl}
      />,
    )

    expect(screen.getByText('Anterior')).toBeInTheDocument()
    expect(screen.getByText('Próxima')).toBeInTheDocument()
  })

  it('should render previous button as enabled when hasPreviousPage is true', () => {
    renderWithRouter(
      <PaginationControlView
        previousCursor='prev123'
        nextCursor='next456'
        hasNextPage={true}
        hasPreviousPage={true}
        onBuildUrl={mockOnBuildUrl}
      />,
    )

    const previousButton = screen.getByText('Anterior')
    expect(previousButton).toBeInTheDocument()
    expect(previousButton).not.toHaveClass('pointer-events-none')
    expect(previousButton).not.toHaveClass('opacity-50')
    expect(previousButton).toHaveClass('hover:bg-stone-50')
  })

  it('should render next button as enabled when hasNextPage is true', () => {
    renderWithRouter(
      <PaginationControlView
        previousCursor='prev123'
        nextCursor='next456'
        hasNextPage={true}
        hasPreviousPage={true}
        onBuildUrl={mockOnBuildUrl}
      />,
    )

    const nextButton = screen.getByText('Próxima')
    expect(nextButton).toBeInTheDocument()
    expect(nextButton).not.toHaveClass('pointer-events-none')
    expect(nextButton).not.toHaveClass('opacity-50')
    expect(nextButton).toHaveClass('hover:bg-stone-50')
  })

  it('should render previous button as disabled when hasPreviousPage is false', () => {
    renderWithRouter(
      <PaginationControlView
        previousCursor='prev123'
        nextCursor='next456'
        hasNextPage={true}
        hasPreviousPage={false}
        onBuildUrl={mockOnBuildUrl}
      />,
    )

    const previousButton = screen.getByText('Anterior')
    expect(previousButton).toBeInTheDocument()
    expect(previousButton).toHaveClass('pointer-events-none')
    expect(previousButton).toHaveClass('opacity-50')
    expect(previousButton).not.toHaveClass('hover:bg-stone-50')
  })

  it('should render next button as disabled when hasNextPage is false', () => {
    renderWithRouter(
      <PaginationControlView
        previousCursor='prev123'
        nextCursor='next456'
        hasNextPage={false}
        hasPreviousPage={true}
        onBuildUrl={mockOnBuildUrl}
      />,
    )

    const nextButton = screen.getByText('Próxima')
    expect(nextButton).toBeInTheDocument()
    expect(nextButton).toHaveClass('pointer-events-none')
    expect(nextButton).toHaveClass('opacity-50')
    expect(nextButton).not.toHaveClass('hover:bg-stone-50')
  })

  it('should call onBuildUrl with previousCursor when previous button is clicked', () => {
    renderWithRouter(
      <PaginationControlView
        previousCursor='prev123'
        nextCursor='next456'
        hasNextPage={true}
        hasPreviousPage={true}
        onBuildUrl={mockOnBuildUrl}
      />,
    )

    const previousButton = screen.getByText('Anterior')
    expect(previousButton).toHaveAttribute('href', '/?previousCursor=prev123')
  })

  it('should call onBuildUrl with nextCursor when next button is clicked', () => {
    renderWithRouter(
      <PaginationControlView
        previousCursor='prev123'
        nextCursor='next456'
        hasNextPage={true}
        hasPreviousPage={true}
        onBuildUrl={mockOnBuildUrl}
      />,
    )

    const nextButton = screen.getByText('Próxima')
    expect(nextButton).toHaveAttribute('href', '/?nextCursor=next456')
  })

  it('should set href to "#" when previous button is disabled', () => {
    renderWithRouter(
      <PaginationControlView
        previousCursor='prev123'
        nextCursor='next456'
        hasNextPage={true}
        hasPreviousPage={false}
        onBuildUrl={mockOnBuildUrl}
      />,
    )

    const previousButton = screen.getByText('Anterior')
    expect(previousButton).toHaveAttribute('href', '/')
  })

  it('should set href to "#" when next button is disabled', () => {
    renderWithRouter(
      <PaginationControlView
        previousCursor='prev123'
        nextCursor='next456'
        hasNextPage={false}
        hasPreviousPage={true}
        onBuildUrl={mockOnBuildUrl}
      />,
    )

    const nextButton = screen.getByText('Próxima')
    expect(nextButton).toHaveAttribute('href', '/')
  })

  it('should set aria-disabled attribute correctly', () => {
    renderWithRouter(
      <PaginationControlView
        previousCursor='prev123'
        nextCursor='next456'
        hasNextPage={false}
        hasPreviousPage={false}
        onBuildUrl={mockOnBuildUrl}
      />,
    )

    const previousButton = screen.getByText('Anterior')
    const nextButton = screen.getByText('Próxima')

    expect(previousButton).toHaveAttribute('aria-disabled', 'true')
    expect(nextButton).toHaveAttribute('aria-disabled', 'true')
  })

  it('should apply custom className when provided', () => {
    const { container } = renderWithRouter(
      <PaginationControlView
        previousCursor='prev123'
        nextCursor='next456'
        hasNextPage={true}
        hasPreviousPage={true}
        onBuildUrl={mockOnBuildUrl}
        className='custom-class'
      />,
    )

    const paginationContainer = container.querySelector('.text-right')
    expect(paginationContainer).toHaveClass('custom-class')
  })

  it('should use default className when not provided', () => {
    const { container } = renderWithRouter(
      <PaginationControlView
        previousCursor='prev123'
        nextCursor='next456'
        hasNextPage={true}
        hasPreviousPage={true}
        onBuildUrl={mockOnBuildUrl}
      />,
    )

    const paginationContainer = container.querySelector('.text-right')
    expect(paginationContainer).toHaveClass('text-right')
  })

  it('should handle null cursors correctly', () => {
    renderWithRouter(
      <PaginationControlView
        previousCursor={null}
        nextCursor={null}
        hasNextPage={false}
        hasPreviousPage={false}
        onBuildUrl={mockOnBuildUrl}
      />,
    )

    const previousButton = screen.getByText('Anterior')
    const nextButton = screen.getByText('Próxima')

    expect(previousButton).toHaveAttribute('href', '/')
    expect(nextButton).toHaveAttribute('href', '/')
  })
})
