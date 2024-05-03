import { PartialType } from '@nestjs/mapped-types';
import { CreateGeoVisitDto } from './create-geo-visit.dto';

export class UpdateGeoVisitDto extends PartialType(CreateGeoVisitDto) {}
