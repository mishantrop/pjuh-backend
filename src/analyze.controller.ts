/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
/* eslint-disable indent */
import { HttpService } from '@nestjs/axios'
import { Body, Controller, Post } from '@nestjs/common'
import { IsNotEmpty, IsString } from 'class-validator'
import { getVersionPrefix } from './utils/getVersionType'

import { parsePackageJson } from './utils/parsePackageJson'

export class RequestText {
  @IsNotEmpty()
  @IsString()
  text: string
}

const getPackageLatestVersion = async (httpService: HttpService, packageName: string) => {
  const response = await httpService
    .get(`https://registry.npmjs.org/${packageName}`)
    .toPromise()

  return response.data['dist-tags'].latest
}

@Controller('analyze')
export class AnalyzeController {
  constructor(private readonly httpService: HttpService) {}

  @Post('updates/text')
  async updates(@Body() body: RequestText) {
    const info = parsePackageJson(body.text)

    let parsedPackagesLimit = 3

    for (let i = 0; i < info.dependencies.length; i++) {
      if (parsedPackagesLimit <= 0) {
        break
      }
      try {
        const packageLatestVersion = await getPackageLatestVersion(this.httpService, info.dependencies[i].name)
        info.dependencies[i].after.versionRaw = `${getVersionPrefix(info.dependencies[i].before.versionType)}${packageLatestVersion}`
        info.dependencies[i].after.versionFixed = packageLatestVersion
        parsedPackagesLimit--
      } catch (error) {
        console.error(error)
      }
    }

    return info
  }

  // @Get('updates/info')
  // async info() {
  //   const packageJsonFile = readFileSync(
  //     resolve(__dirname, '../../package.json'),
  //     'utf-8',
  //   )

  //   const info = parsePackageJson(example)

  //   const response = await this.httpService
  //     .get('https://registry.npmjs.org/axios')
  //     .toPromise()
  //   console.log(response.data['dist-tags'])

  //   return info
  // }
}
