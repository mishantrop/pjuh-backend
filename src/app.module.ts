import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AnalyzeController } from './analyze.controller'
import { AnalyzeService } from './analyze.service'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { OrmModule } from './modules/orm/orm.module'

@Module({
    imports: [
        ConfigModule.forRoot(),
        HttpModule.register({
            timeout: 3000,
            maxRedirects: 2,
        }),
        OrmModule,
    ],
    controllers: [AnalyzeController, AppController],
    providers: [AnalyzeService, AppService],
})
export class AppModule {}
