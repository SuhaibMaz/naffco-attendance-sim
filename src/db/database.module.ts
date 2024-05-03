import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MysqlDataSource } from './mysql/mysql.dp';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: MysqlDataSource,
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
