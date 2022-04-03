import { Module } from '@nestjs/common'

import { AnalyzeController } from './analyze.controller'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [],
  controllers: [AppController, AnalyzeController],
  providers: [AppService],
})
export class AppModule {}
