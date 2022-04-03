import { getVersionType } from './getVersionType'

describe('root', () => {
  it('Common cases', () => {
    expect(getVersionType('^1.0.0')).toEqual('caret')
    expect(getVersionType('~1.0.0')).toEqual('tilde')
    expect(getVersionType('1.0.0')).toEqual('fixed')
    expect(() => {
      getVersionType('')
    }).toThrow(TypeError)
  })
})
