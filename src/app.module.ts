import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './db/database.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { HttpModule } from '@nestjs/axios';
import { GeoVisitsModule } from './modules/geo-visits/geo-visits.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HttpModule.registerAsync({
      useFactory: async () => ({
        headers: {
          accept: '*/*',
          'content-type': 'application/x-www-form-urlencoded',
        },
        timeout: 6000 * 60,
      }),
      inject: [ConfigService],
    }),
    DatabaseModule,
    ScheduleModule.forRoot(),
    GeoVisitsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
