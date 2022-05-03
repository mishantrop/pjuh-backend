/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
import { AbbreviatedPackument, getAbbreviatedPackument } from 'query-registry'
import { Injectable } from '@nestjs/common'

import { ParseResult } from '../types'

import { isValidVersion } from './utils/isValidVersion'
import { parsePackageJson } from './utils/parsePackageJson'
import { getUpdatedVersion } from './utils/getUpdatedVersion'
import { getPatchedVersion } from './utils/getPatchedVersion'

@Injectable()
export class AnalyzeService {
    async getUpdateInfo(fileContent: string): Promise<ParseResult> {
        const info = parsePackageJson(fileContent)

        const limit = Math.min(32, info.allDependencies.length)

        for (let i = 0; i < limit; i++) {
            try {
                if (!isValidVersion(info.allDependencies[i].before.raw)) {
                    info.allDependencies[i].error = {
                        code: 'invalid_version',
                    }
                    continue
                }

                const { versionType } = info.allDependencies[i].before

                let packument: AbbreviatedPackument
                try {
                    packument = await getAbbreviatedPackument({ name: info.allDependencies[i].name })
                    // console.log(info.allDependencies[i].name)
                    // console.log(Object.keys(packument.versions).join(', '))
                } catch (error) {
                    info.allDependencies[i].error = {
                        code: 'not_found',
                    }
                    continue
                }

                info.allDependencies[i].after.latest = `${versionType}${packument['dist-tags'].latest}`
                info.allDependencies[i].after.latestFixed = packument['dist-tags'].latest

                if (versionType === '') {
                    info.allDependencies[i].after.semver = packument['dist-tags'].latest
                } else if (versionType === '^') {
                    info.allDependencies[i].after.semver = `${versionType}${getUpdatedVersion(info.allDependencies[i].before.fixed, Object.keys(packument.versions))}`
                } else if (versionType === '~') {
                    info.allDependencies[i].after.semver = `${versionType}${getPatchedVersion(info.allDependencies[i].before.fixed, Object.keys(packument.versions))}`
                }
                // if (info.dependencies[i].after.semver) {
                //     info.dependencies[i].after.semverFixed = cleanVersion(info.dependencies[i].after.semver)
                // }

            } catch (error) {
                console.error(error)
            }
        }

        return info
    }
}
