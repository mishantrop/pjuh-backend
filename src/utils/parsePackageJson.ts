/* eslint-disable prettier/prettier */
import { PackageJSON } from 'query-registry'
import {
    DependencyCategory,
    DependencyType,
    Package,
    ParseResult,
} from '../../types'
import { cleanVersion } from './cleanVersion'
import { getVersionType } from './getVersionType'

export const parsePackageJson = (content: string): ParseResult => {
    const info: ParseResult = {
        allDependencies: [],
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
                let dependencyType: DependencyType = 'prod'
                switch (depType) {
                case 'devDependencies':
                    dependencyType = 'dev'
                    break
                case 'peerDependencies':
                    dependencyType = 'peer'
                    break
                case 'optionalDependencies':
                    dependencyType = 'optional'
                    break
                default:
                    break
                }

                const newItem: Package = {
                    name,
                    meta: {
                        updateMode: 'SEMVER',
                        type: dependencyType,
                        isUpdating: true,
                    },
                    before: {
                        fixed: cleanVersion(packageJsonObject[depType][name]),
                        raw: packageJsonObject[depType][name],
                        versionType: getVersionType(
                            packageJsonObject[depType][name],
                        ),
                    },
                    after: {},
                }

                // info[depType].push(newItem)
                info.allDependencies.push(newItem)
            })
        }
    })

    return info
}
