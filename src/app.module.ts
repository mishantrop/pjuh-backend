import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'

import { AnalyzeController } from './analyze.controller'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [
    HttpModule.register({
      timeout: 3000,
      maxRedirects: 2,
    }),
  ],
  controllers: [AppController, AnalyzeController],
  providers: [AppService],
})
export class AppModule {}
