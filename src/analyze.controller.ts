/* eslint-disable prettier/prettier */
/* eslint-disable indent */
import { HttpService } from '@nestjs/axios'
import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { IsNotEmpty, IsString } from 'class-validator'
import { readFileSync, unlinkSync } from 'fs'
import { resolve } from 'path'

import { AnalyzeService } from './analyze.service'

const xxx = `
{
  "name": "example",
  "version": "1.2.3",
  "dependencies": {
    "react": "16.1.0",
    "reactsdf2d1f4f4misha": "16.1.0",
    "@nestjs/common": "^7.0.0",
    "@nestjs/core": "~7.0.0",
    "@nestjs/platform-express": "7.0.0"
  },
  "devDependencies": {
    "@nestjs/cli": "8.0.0",
    "@nestjs/schematics": "8.0.0",
    "typescript": "4.3.5"
  }
}
`

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
        const info = await this.analyzeService.getUpdateInfo(body.text)

        return info
    }

  @Get('updates/text2')
  async text2() {
    const info = await this.analyzeService.getUpdateInfo(xxx)

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

    const info = await this.analyzeService.getUpdateInfo(packageJsonContent)

    return info
  }
}
