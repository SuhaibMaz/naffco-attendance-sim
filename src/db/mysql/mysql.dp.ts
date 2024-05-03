import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const MysqlDataSource = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  const options: TypeOrmModuleOptions = {
    type: 'mysql',
    host: configService.get('MYSQL_DB_HOST'),
    port: +configService.get<number>('MYSQL_DB_PORT'),
    username: configService.get('MYSQL_DB_USER'),
    password: configService.get('MYSQL_DB_PASS'),
    database: configService.get('MYSQL_DB_NAME'),
    entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
    synchronize: configService.get<boolean>('DB_SYNC'),
  };

  return options;
};
