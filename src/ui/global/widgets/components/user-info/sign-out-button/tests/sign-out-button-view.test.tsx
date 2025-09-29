import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'

import { SignOutButtonView } from '../sign-out-button-view'

describe('SignOutButtonView', () => {
  const mockOnClick = vi.fn()

  beforeEach(() => {
    mockOnClick.mockClear()
  })

  it('should render button with correct text', () => {
    render(<SignOutButtonView onClick={mockOnClick} />)

    expect(screen.getByText('Sair da sua conta')).toBeInTheDocument()
  })

  it('should render LogOut icon', () => {
    render(<SignOutButtonView onClick={mockOnClick} />)

    const icon = screen.getByRole('button').querySelector('svg')
    expect(icon).toBeInTheDocument()
  })

  it('should call onClick when button is clicked', () => {
    render(<SignOutButtonView onClick={mockOnClick} />)

    const button = screen.getByRole('button')
    button.click()

    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })

  it('should not call onClick when button is not clicked', () => {
    render(<SignOutButtonView onClick={mockOnClick} />)

    expect(mockOnClick).not.toHaveBeenCalled()
  })

  it('should render span with correct text', () => {
    render(<SignOutButtonView onClick={mockOnClick} />)

    const span = screen.getByText('Sair da sua conta')
    expect(span.tagName).toBe('SPAN')
  })

  it('should be accessible', () => {
    render(<SignOutButtonView onClick={mockOnClick} />)

    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })

  it('should handle multiple clicks correctly', () => {
    render(<SignOutButtonView onClick={mockOnClick} />)

    const button = screen.getByRole('button')

    button.click()
    button.click()
    button.click()

    expect(mockOnClick).toHaveBeenCalledTimes(3)
  })
})
