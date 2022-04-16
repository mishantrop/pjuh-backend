import { getVersionParts } from './getVersionParts'

export const getUpdatedVersion = (versionFixed: string, variants: string[]) => {
    const current = getVersionParts(versionFixed)

    const filteredVariants = variants.filter((v) => {
        const vInfo = getVersionParts(v)
        return current.major === vInfo.major
    })

    if (filteredVariants.length === 0) {
        return versionFixed
    }

    return filteredVariants[filteredVariants.length - 1]
}
