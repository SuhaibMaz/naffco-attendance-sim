import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GeoVisitsService } from './geo-visits.service';
import { CreateGeoVisitDto } from './dto/create-geo-visit.dto';
import { UpdateGeoVisitDto } from './dto/update-geo-visit.dto';

@Controller('geo-visits')
export class GeoVisitsController {
  constructor(private readonly geoVisitsService: GeoVisitsService) {}

  // @Post()
  // create(@Body() createGeoVisitDto: CreateGeoVisitDto) {
  //   return this.geoVisitsService.create(createGeoVisitDto);
  // }

  // @Get()
  // findAll() {
  //   return this.geoVisitsService.findAll();
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.geoVisitsService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateGeoVisitDto: UpdateGeoVisitDto) {
  //   return this.geoVisitsService.update(+id, updateGeoVisitDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.geoVisitsService.remove(+id);
  // }
}
