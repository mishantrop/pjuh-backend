import { Controller, Get } from '@nestjs/common'
import { readFileSync } from 'fs'
import { resolve } from 'path'

import { AppService } from './app.service'
import { parsePackageJson } from './utils/parsePackageJson'

@Controller('analyze')
export class AnalyzeController {
  constructor(private readonly appService: AppService) {}

  @Get('updates')
  updates() {
    const packageJsonFile = readFileSync(
      resolve(__dirname, '../../package.json'),
      'utf-8',
    )

    const info = parsePackageJson(packageJsonFile)

    return info
  }
}
