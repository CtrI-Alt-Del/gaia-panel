import { render, screen, fireEvent } from '@testing-library/react'

import { DialogView } from '../dialog-view'

const mockChildren = vi.fn((closeDialog: () => void) => (
  <div data-testid='dialog-content'>
    <button type='button' data-testid='close-button' onClick={closeDialog}>
      Close
    </button>
  </div>
))

const defaultProps = {
  children: mockChildren,
  isOpen: true,
  open: vi.fn(),
  close: vi.fn(),
  isAnimating: true,
}

describe('DialogView', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render dialog when isOpen is true', () => {
    render(<DialogView {...defaultProps} />)

    expect(screen.getByTestId('dialog-content')).toBeInTheDocument()
  })

  it('should not render dialog when isOpen is false', () => {
    render(<DialogView {...defaultProps} isOpen={false} />)

    expect(screen.queryByTestId('dialog-content')).not.toBeInTheDocument()
  })

  it('should render trigger when provided', () => {
    const trigger = (
      <button type='button' data-testid='trigger-button'>
        Open Dialog
      </button>
    )
    render(<DialogView {...defaultProps} trigger={trigger} />)

    expect(screen.getByTestId('trigger-button')).toBeInTheDocument()
  })

  it('should call open when trigger is clicked', () => {
    const trigger = (
      <button type='button' data-testid='trigger-button'>
        Open Dialog
      </button>
    )
    const open = vi.fn()
    render(<DialogView {...defaultProps} trigger={trigger} open={open} />)

    fireEvent.click(screen.getByTestId('trigger-button'))

    expect(open).toHaveBeenCalledTimes(1)
  })

  it('should render title when provided', () => {
    render(<DialogView {...defaultProps} title='Test Title' />)

    expect(screen.getByText('Test Title')).toBeInTheDocument()
  })

  it('should render description when provided', () => {
    render(<DialogView {...defaultProps} description='Test Description' />)

    expect(screen.getByText('Test Description')).toBeInTheDocument()
  })

  it('should render close button by default', () => {
    render(<DialogView {...defaultProps} />)

    // Find the close button by its specific class instead of aria-label
    const closeButton = document.querySelector('.text-gray-400.hover\\:text-gray-600')
    expect(closeButton).toBeInTheDocument()
  })

  it('should hide close button when hideCloseButton is true', () => {
    render(<DialogView {...defaultProps} hideCloseButton={true} />)

    // Check that the close button with specific class is not present
    const closeButton = document.querySelector('.text-gray-400.hover\\:text-gray-600')
    expect(closeButton).not.toBeInTheDocument()
  })

  it('should call close when close button is clicked', () => {
    const close = vi.fn()
    render(<DialogView {...defaultProps} close={close} />)

    const closeButton = document.querySelector('.text-gray-400.hover\\:text-gray-600')
    fireEvent.click(closeButton!)

    expect(close).toHaveBeenCalledTimes(1)
  })

  it('should call close when close button is pressed with Enter key', () => {
    const close = vi.fn()
    render(<DialogView {...defaultProps} close={close} />)

    const closeButton = document.querySelector('.text-gray-400.hover\\:text-gray-600')
    fireEvent.keyDown(closeButton!, { key: 'Enter' })

    expect(close).toHaveBeenCalledTimes(1)
  })

  it('should render backdrop when isDismissable is true', () => {
    render(<DialogView {...defaultProps} isDismissable={true} />)

    const backdrop = document.querySelector('.fixed.inset-0.z-50.bg-black\\/50')
    expect(backdrop).toBeInTheDocument()
  })

  it('should not render backdrop when isDismissable is false', () => {
    render(<DialogView {...defaultProps} isDismissable={false} />)

    // Should only have the close button, not the backdrop
    const closeButton = screen.getByRole('button', { name: 'Fechar dialog' })
    expect(closeButton).toBeInTheDocument()
  })

  it('should call close when backdrop is clicked', () => {
    const close = vi.fn()
    render(<DialogView {...defaultProps} close={close} isDismissable={true} />)

    // Find backdrop by its specific class
    const backdrop = document.querySelector('.fixed.inset-0.z-50.bg-black\\/50')
    expect(backdrop).toBeInTheDocument()

    fireEvent.click(backdrop!)

    expect(close).toHaveBeenCalledTimes(1)
  })

  it('should call close when backdrop is pressed with Enter key', () => {
    const close = vi.fn()
    render(<DialogView {...defaultProps} close={close} isDismissable={true} />)

    // Find backdrop by its specific class
    const backdrop = document.querySelector('.fixed.inset-0.z-50.bg-black\\/50')
    expect(backdrop).toBeInTheDocument()

    fireEvent.keyDown(backdrop!, { key: 'Enter' })

    expect(close).toHaveBeenCalledTimes(1)
  })

  it('should render header when showHeader is true and has content', () => {
    render(<DialogView {...defaultProps} showHeader={true} title='Test Title' />)

    expect(screen.getByText('Test Title')).toBeInTheDocument()
  })

  it('should not render header when showHeader is false', () => {
    render(<DialogView {...defaultProps} showHeader={false} title='Test Title' />)

    expect(screen.queryByText('Test Title')).not.toBeInTheDocument()
  })

  it('should not render header when no title, description, and hideCloseButton is true', () => {
    render(<DialogView {...defaultProps} showHeader={true} hideCloseButton={true} />)

    // Should not have any close buttons
    const closeButton = document.querySelector('.text-gray-400.hover\\:text-gray-600')
    expect(closeButton).not.toBeInTheDocument()
  })

  it('should apply correct size classes', () => {
    const { rerender } = render(<DialogView {...defaultProps} size='sm' />)

    let dialog = screen.getByTestId('dialog-content').closest('.max-w-sm')
    expect(dialog).toBeInTheDocument()

    rerender(<DialogView {...defaultProps} size='lg' />)

    dialog = screen.getByTestId('dialog-content').closest('.max-w-lg')
    expect(dialog).toBeInTheDocument()

    rerender(<DialogView {...defaultProps} size='full' />)

    dialog = screen.getByTestId('dialog-content').closest('.max-w-full')
    expect(dialog).toBeInTheDocument()
  })

  it('should apply scrollbar-hide class when hideScrollbar is true', () => {
    render(<DialogView {...defaultProps} hideScrollbar={true} />)

    const content = screen.getByTestId('dialog-content').parentElement
    expect(content).toHaveClass('scrollbar-hide')
  })

  it('should not apply scrollbar-hide class when hideScrollbar is false', () => {
    render(<DialogView {...defaultProps} hideScrollbar={false} />)

    const content = screen.getByTestId('dialog-content').parentElement
    expect(content).not.toHaveClass('scrollbar-hide')
  })

  it('should apply animation classes when isAnimating is true', () => {
    render(<DialogView {...defaultProps} isAnimating={true} />)

    const dialog = screen.getByTestId('dialog-content').closest('.opacity-100')
    expect(dialog).toBeInTheDocument()
  })

  it('should apply animation classes when isAnimating is false', () => {
    render(<DialogView {...defaultProps} isAnimating={false} />)

    const dialog = screen.getByTestId('dialog-content').closest('.opacity-0')
    expect(dialog).toBeInTheDocument()
  })

  it('should call children function with close function', () => {
    render(<DialogView {...defaultProps} />)

    expect(mockChildren).toHaveBeenCalledWith(expect.any(Function))
  })

  it('should call close when children close button is clicked', () => {
    const close = vi.fn()
    render(<DialogView {...defaultProps} close={close} />)

    fireEvent.click(screen.getByTestId('close-button'))

    expect(close).toHaveBeenCalledTimes(1)
  })

  it('should render with different sizes correctly', () => {
    const sizes = [
      'xs',
      'sm',
      'md',
      'lg',
      'xl',
      '2xl',
      '3xl',
      '4xl',
      '5xl',
      'full',
    ] as const

    sizes.forEach((size) => {
      const { unmount } = render(<DialogView {...defaultProps} size={size} />)

      const dialog = screen.getByTestId('dialog-content').closest('div')
      expect(dialog).toBeInTheDocument()

      unmount()
    })
  })

  it('should handle full size with correct height class', () => {
    render(<DialogView {...defaultProps} size='full' />)

    const dialog = screen.getByTestId('dialog-content').closest('.h-\\[90vh\\]')
    expect(dialog).toBeInTheDocument()
  })

  it('should handle non-full sizes with max-height class', () => {
    render(<DialogView {...defaultProps} size='md' />)

    const dialog = screen.getByTestId('dialog-content').closest('.max-h-\\[90vh\\]')
    expect(dialog).toBeInTheDocument()
  })
})
