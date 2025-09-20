import { Dialog } from '../index'

describe('Dialog Component', () => {
  it('should be exported from the module', () => {
    expect(Dialog).toBeDefined()
  })

  it('should be a React component', () => {
    expect(typeof Dialog).toBe('object')
  })
})
