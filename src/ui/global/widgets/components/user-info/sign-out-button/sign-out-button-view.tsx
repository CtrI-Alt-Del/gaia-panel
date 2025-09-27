import { LogOut } from 'lucide-react'

type Props = {
  onClick: () => void
}

export const SignOutButtonView = ({ onClick }: Props) => {
  return (
    <div>
      <button
        type='button'
        className='cursor-pointer flex items-center'
        onClick={onClick}
      >
        <LogOut className='mr-2 h-4 w-4' />
        <span>Sair da sua conta</span>
      </button>
    </div>
  )
}
