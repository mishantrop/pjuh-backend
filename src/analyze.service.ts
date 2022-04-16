/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable prettier/prettier */
/* eslint-disable max-len */
import { AbbreviatedPackument, getAbbreviatedPackument } from 'query-registry'
import { Injectable } from '@nestjs/common'
import { ParseResult } from 'types'

import { isValidVersion } from './utils/isValidVersion'
import { parsePackageJson } from './utils/parsePackageJson'
import { getUpdatedVersion } from './utils/getUpdatedVersion'
import { getPatchedVersion } from './utils/getPatchedVersion'
import { cleanVersion } from './utils/cleanVersion'

@Injectable()
export class AnalyzeService {
    async getUpdateInfo(fileContent: string): Promise<ParseResult> {
        const info = parsePackageJson(fileContent)

        const limit = Math.min(3, info.dependencies.length)

        for (let i = 0; i < limit; i++) {
            try {
                if (!isValidVersion(info.dependencies[i].before.raw)) {
                    info.dependencies[i].error = {
                        code: 'invalid_version',
                    }
                    continue
                }

                const { versionType } = info.dependencies[i].before

                let packument: AbbreviatedPackument
                try {
                    packument = await getAbbreviatedPackument({ name: info.dependencies[i].name })
                    console.log(info.dependencies[i].name)
                    console.log(Object.keys(packument.versions).join(', '))
                } catch (error) {
                    info.dependencies[i].error = {
                        code: 'not_found',
                    }
                    continue
                }

                info.dependencies[i].after.latest = `${versionType}${packument['dist-tags'].latest}`
                info.dependencies[i].after.latestFixed = packument['dist-tags'].latest

                if (versionType === '') {
                    info.dependencies[i].after.semver = packument['dist-tags'].latest
                } else if (versionType === '^') {
                    info.dependencies[i].after.semver = `${versionType}${getUpdatedVersion(info.dependencies[i].before.fixed, Object.keys(packument.versions))}`
                } else if (versionType === '~') {
                    info.dependencies[i].after.semver = `${versionType}${getPatchedVersion(info.dependencies[i].before.fixed, Object.keys(packument.versions))}`
                }
                if (info.dependencies[i].after.semver) {
                    info.dependencies[i].after.semverFixed = cleanVersion(info.dependencies[i].after.semver)
                }

            } catch (error) {
                console.error(error)
            }
        }

        return info
    }
}
