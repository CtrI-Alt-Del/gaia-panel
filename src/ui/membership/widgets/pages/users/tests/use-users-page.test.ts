import { renderHook, act } from '@testing-library/react'
import { useUsersPage } from '../use-users-page'
import type { UserDto } from '@/core/membership/dtos/user-dto'
import { UsersFaker } from '@/core/membership/dtos/fakers/users-faker'

describe('useUsersPage hook', () => {
  const users: UserDto[] = [
    UsersFaker.fakeDto({ id: '1', name: 'John Doe', email: 'john@example.com' }),
    UsersFaker.fakeDto({ id: '2', name: 'Jane Smith', email: 'jane@example.com', isActive: false }),
    UsersFaker.fakeDto({ id: '3', name: 'Bob Johnson', email: 'bob@example.com' }),
  ]

  it('should initialize with undefined selectedUser', () => {
    const { result } = renderHook(() => useUsersPage({ users: users }))

    expect(result.current.selectedUser).toBeUndefined()
    expect(typeof result.current.handleEdit).toBe('function')
  })

  it('should set selectedUser when handleEdit is called with valid id', () => {
    const { result } = renderHook(() => useUsersPage({ users: users }))

    act(() => {
      result.current.handleEdit('1')
    })

    expect(result.current.selectedUser).toEqual(users[0])
  })

  it('should set selectedUser when handleEdit is called with valid id as string', () => {
    const { result } = renderHook(() => useUsersPage({ users: users }))

    act(() => {
      result.current.handleEdit('2')
    })

    expect(result.current.selectedUser).toEqual(users[1])
  })

  it('should not change selectedUser when handleEdit is called with invalid id', () => {
    const { result } = renderHook(() => useUsersPage({ users: users }))

    // First set a user
    act(() => {
      result.current.handleEdit('1')
    })

    expect(result.current.selectedUser).toEqual(users[0])

    // Try to set with invalid id
    act(() => {
      result.current.handleEdit('999')
    })

    expect(result.current.selectedUser).toEqual(users[0])
  })

  it('should not change selectedUser when handleEdit is called with empty string', () => {
    const { result } = renderHook(() => useUsersPage({ users: users }))

    // First set a user
    act(() => {
      result.current.handleEdit('1')
    })

    expect(result.current.selectedUser).toEqual(users[0])

    // Try to set with empty string
    act(() => {
      result.current.handleEdit('')
    })

    expect(result.current.selectedUser).toEqual(users[0])
  })

  it('should handle empty users array', () => {
    const { result } = renderHook(() => useUsersPage({ users: [] }))

    act(() => {
      result.current.handleEdit('1')
    })

    expect(result.current.selectedUser).toBeUndefined()
  })

  it('should update selectedUser when handleEdit is called with different valid id', () => {
    const { result } = renderHook(() => useUsersPage({ users: users }))

    // Set first user
    act(() => {
      result.current.handleEdit('1')
    })

    expect(result.current.selectedUser).toEqual(users[0])

    // Change to different user
    act(() => {
      result.current.handleEdit('3')
    })

    expect(result.current.selectedUser).toEqual(users[2])
  })

  it('should handle users with numeric id converted to string', () => {
    const usersWithNumericId: UserDto[] = [
      UsersFaker.fakeDto({ id: '123', name: 'Test User', email: 'test@example.com' }),
    ]

    const { result } = renderHook(() => useUsersPage({ users: usersWithNumericId }))

    act(() => {
      result.current.handleEdit('123')
    })

    expect(result.current.selectedUser).toEqual(usersWithNumericId[0])
  })
})
