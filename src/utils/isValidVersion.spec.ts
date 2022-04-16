import { isValidVersion } from './isValidVersion'

describe('isValidVersion', () => {
    it('Valid versions', () => {
        expect(isValidVersion('^1.0.0')).toBeTruthy()
        expect(isValidVersion('~1.0.0')).toBeTruthy()
        expect(isValidVersion('1.0.0')).toBeTruthy()
    })
    it('Invalid versions', () => {
        expect(isValidVersion('~123.456.789')).toBeFalsy()
        expect(isValidVersion('^123.456.789')).toBeFalsy()
        expect(isValidVersion('1.~23.45')).toBeFalsy()
        expect(isValidVersion('1.23.~4')).toBeFalsy()
        expect(isValidVersion('1.0.0~')).toBeFalsy()
        expect(isValidVersion('1.0~.0')).toBeFalsy()
        expect(isValidVersion('+1.0.0')).toBeFalsy()
        expect(isValidVersion('-1.0.0')).toBeFalsy()
        expect(isValidVersion('a.b.c')).toBeFalsy()
        expect(isValidVersion('1.0')).toBeFalsy()
        expect(isValidVersion('a.b')).toBeFalsy()
        expect(isValidVersion('1')).toBeFalsy()
        expect(isValidVersion('a')).toBeFalsy()
        expect(isValidVersion('')).toBeFalsy()
    })
})
