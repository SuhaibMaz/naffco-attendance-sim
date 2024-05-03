import { Module } from '@nestjs/common';
import { GeoVisitsService } from './geo-visits.service';
import { GeoVisitsController } from './geo-visits.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeoVisit } from './entities/geo-visit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GeoVisit])],
  controllers: [GeoVisitsController],
  providers: [GeoVisitsService],
  exports: [GeoVisitsService],
})
export class GeoVisitsModule {}
