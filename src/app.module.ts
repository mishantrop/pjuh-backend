import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'

import { AnalyzeController } from './analyze.controller'
import { AnalyzeService } from './analyze.service'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [
    HttpModule.register({
      timeout: 3000,
      maxRedirects: 2,
    }),
  ],
  controllers: [AnalyzeController, AppController],
  providers: [AnalyzeService, AppService],
})
export class AppModule {}
