import { Injectable } from '@nestjs/common';
import { CreateGeoVisitDto } from './dto/create-geo-visit.dto';
import { UpdateGeoVisitDto } from './dto/update-geo-visit.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GeoVisit } from './entities/geo-visit.entity';
import { from } from 'rxjs';

@Injectable()
export class GeoVisitsService {
  constructor(
    @InjectRepository(GeoVisit)
    private repository: Repository<GeoVisit>,
  ) {}
  create(createGeoVisitDto: CreateGeoVisitDto) {
    return this.repository.save(createGeoVisitDto);
  }

  findAll() {
    return `This action returns all geoVisits`;
  }

  findOne(unitId: number) {
    const query = this.repository.createQueryBuilder('geoVisit');
    query.select(`geoVisit.unitId`, 'unitId');
    query.addSelect('MAX(geoVisit.exitTime)', 'exitTime');
    query.where(`geoVisit.unitId = ${unitId}`);
    return from(query.getRawOne());
  }

  update(id: number, updateGeoVisitDto: UpdateGeoVisitDto) {
    return `This action updates a #${id} geoVisit`;
  }

  remove(id: number) {
    return `This action removes a #${id} geoVisit`;
  }
}
