import { getUpdatedVersion } from './getUpdatedVersion'

describe('getUpdatedVersion', () => {
    it('Common cases', () => {
    // Ideal situation
        expect(
            getUpdatedVersion('1.0.0', [
                '0.0.1',
                '0.1.0',
                '0.1.2',

                '1.0.0',
                '1.0.1',
                '1.0.2',
                '1.1.1', // Latest minor-patch for 1.0.0

                '2.1.0',
                '2.1.1',
            ]),
        ).toBe('1.1.1')

        // Current version is the latest patch
        expect(
            getUpdatedVersion('1.0.0', ['0.1.0', '1.0.0', '2.1.0', '3.1.0']),
        ).toBe('1.0.0')

        expect(getUpdatedVersion('1.0.0', [])).toBe('1.0.0')
    })
})
