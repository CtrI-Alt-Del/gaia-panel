import { fireEvent, render, screen } from '@testing-library/react'

import { UserStatusButtonView } from '../user-status-button-view'

describe('UserStatusButtonView', () => {
  const onConfirm = vi.fn()

  vi.mock('@/ui/global/widgets/components/alert-dialog', () => ({
    AlertDialog: vi.fn(({ trigger, onConfirm }) => (
      <div>
        {trigger}
        <button type='button' data-testid='confirm-button' onClick={onConfirm} />
      </div>
    )),
  }))

  it('should render deactivate button when user is active', () => {
    render(<UserStatusButtonView isActive={true} onConfirm={onConfirm} />)

    expect(screen.getByTestId('deactivate-button')).toBeInTheDocument()
  })

  it('should render activate button when user is inactive', () => {
    render(<UserStatusButtonView isActive={false} onConfirm={onConfirm} />)

    expect(screen.getByTestId('activate-button')).toBeInTheDocument()
  })

  it('should render the title depending on the user status', () => {
    render(<UserStatusButtonView isActive={false} onConfirm={onConfirm} />)
    const confirmButton = screen.getByTestId('confirm-button')

    fireEvent.click(confirmButton)

    expect(onConfirm).toHaveBeenCalled()
  })
})
