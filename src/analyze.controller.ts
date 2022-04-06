/* eslint-disable prettier/prettier */
/* eslint-disable indent */
import { HttpService } from '@nestjs/axios'
import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { IsNotEmpty, IsString } from 'class-validator'
import { readFileSync, unlinkSync } from 'fs'
import { resolve } from 'path'

import { AnalyzeService } from './analyze.service'

export class RequestText {
  @IsNotEmpty()
  @IsString()
  text: string
}

@Controller('analyze')
export class AnalyzeController {
  constructor(
    private readonly httpService: HttpService,
    private readonly analyzeService: AnalyzeService,
  ) { }

  @Post('updates/text')
  async text(@Body() body: RequestText) {
    const info = await this.analyzeService.getUpdateInfo(this.httpService, body.text)

    return info
  }

  @Post('updates/file')
  @UseInterceptors(FileInterceptor('file', { dest: resolve(__dirname, '../../uploads') }))
  async file(@UploadedFile() file: Express.Multer.File) {
    console.log(file)

    if (file.size > 4096) {
      return {}
    }

    if (file.mimetype !== 'application/json') {
      return {}
    }

    if (file.originalname !== 'package.json') {
      return {}
    }

    const packageJsonContent = readFileSync(
      resolve(__dirname, file.path),
      'utf-8',
    )
    unlinkSync(resolve(__dirname, file.path))

    const info = await this.analyzeService.getUpdateInfo(this.httpService, packageJsonContent)

    return info
  }
}
