/* eslint-disable prettier/prettier */
/* eslint-disable max-len */
import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { ParseResult } from 'types'

import { getVersionPrefix } from './utils/getVersionType'
import { parsePackageJson } from './utils/parsePackageJson'

@Injectable()
export class AnalyzeService {
  async getPackageLatestVersion(httpService: HttpService, packageName: string) {
    const response = await httpService
      .get(`https://registry.npmjs.org/${packageName}`)
      .toPromise()

    return response.data['dist-tags'].latest
  }

  async getUpdateInfo(httpService: HttpService, fileContent: string): Promise<ParseResult> {
    const info = parsePackageJson(fileContent)

    let parsedPackagesLimit = 3

    for (let i = 0; i < info.dependencies.length; i++) {
      if (parsedPackagesLimit <= 0) {
        break
      }
      try {
        const packageLatestVersion = await this.getPackageLatestVersion(httpService, info.dependencies[i].name)
        info.dependencies[i].after.versionRaw = `${getVersionPrefix(info.dependencies[i].before.versionType)}${packageLatestVersion}`
        info.dependencies[i].after.versionFixed = packageLatestVersion
        parsedPackagesLimit--
      } catch (error) {
        console.error(error)
      }
    }

    return info
  }
}
