import { Version } from '../../types'

export const getVersionParts = (versionFixed: string): Version => {
    const parts = versionFixed.split('.').map((part) => Number(part))

    return {
        major: parts[0],
        minor: parts[1],
        patch: parts[2],
    }
}
