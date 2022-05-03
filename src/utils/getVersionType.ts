import { VersionType } from '../../types'

export const getVersionType = (version: string): VersionType => {
    if (typeof version !== 'string' || version.length === 0) {
        throw new TypeError('Invalid Version Value')
    }

    if (version.startsWith('^')) {
        return '^'
    }

    if (version.startsWith('~')) {
        return '~'
    }

    return ''
}
