import { getVersionType } from './getVersionType'

describe('root', () => {
    it('Common cases', () => {
        expect(getVersionType('^1.0.0')).toEqual('^')
        expect(getVersionType('~1.0.0')).toEqual('~')
        expect(getVersionType('1.0.0')).toEqual('')
        expect(() => {
            getVersionType('')
        }).toThrow(TypeError)
    })
})
