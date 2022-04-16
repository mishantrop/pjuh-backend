import { getPatchedVersion } from './getPatchedVersion'

describe('getPatchedVersion', () => {
    it('Common cases', () => {
    // Ideal situation
        expect(
            getPatchedVersion('1.0.0', [
                '0.0.1',
                '0.1.0',
                '0.1.2',

                '1.0.0',
                '1.0.1',
                '1.0.2', // Latest patch for 1.0.0
                '1.1.1',

                '2.1.0',
            ]),
        ).toBe('1.0.2')

        // Current version is the latest patch
        expect(getPatchedVersion('1.0.0', ['0.1.0', '2.1.0', '3.1.0'])).toBe(
            '1.0.0',
        )

        expect(getPatchedVersion('1.0.0', [])).toBe('1.0.0')
    })
})
