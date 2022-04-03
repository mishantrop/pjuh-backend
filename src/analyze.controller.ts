import { Body, Controller, Post } from '@nestjs/common'
// import { readFileSync } from 'fs'
// import { resolve } from 'path'

import { AppService } from './app.service'
import { parsePackageJson } from './utils/parsePackageJson'

@Controller('analyze')
export class AnalyzeController {
  constructor(private readonly appService: AppService) {}

  @Post('updates/text')
  updates(@Body() body) {
    // const packageJsonFile = readFileSync(
    //   resolve(__dirname, '../../package.json'),
    //   'utf-8',
    // )

    // console.log(body.text)

    const info = parsePackageJson(body.text)

    return info
  }
}
