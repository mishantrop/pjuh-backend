import { PackageJSON } from 'query-registry'
import { DependencyCategory, ParseResult } from '../../types'
import { cleanVersion } from './cleanVersion'
import { getVersionType } from './getVersionType'

export const parsePackageJson = (content: string): ParseResult => {
    const info: ParseResult = {
        [DependencyCategory.dependencies]: [],
        [DependencyCategory.devDependencies]: [],
        [DependencyCategory.peerDependencies]: [],
    }

  let packageJsonObject: PackageJSON

    try {
        packageJsonObject = JSON.parse(content)
    } catch {
        throw new Error('Poka')
    }

    Object.values(DependencyCategory).forEach((depType) => {
        if (depType in packageJsonObject) {
            Object.keys(packageJsonObject[depType]).forEach((name) => {
                info[depType].push({
                    name,
                    before: {
                        fixed: cleanVersion(packageJsonObject[depType][name]),
                        raw: packageJsonObject[depType][name],
                        versionType: getVersionType(packageJsonObject[depType][name]),
                    },
                    after: {},
                })
            })
        }
    })

    return info
}
