import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron } from '@nestjs/schedule';
import { GeoVisitsService } from './modules/geo-visits/geo-visits.service';
import { addTime, unixTimeStamp } from './utils/timeUtils';
import { forkJoin, map, switchMap } from 'rxjs';

@Injectable()
export class AppService {
  @Inject()
  private readonly httpService: HttpService;
  @Inject()
  private readonly configService: ConfigService;
  @Inject()
  private readonly geoVisitsService: GeoVisitsService;

  vehicles = [60197, 58139, 58109];
  units = [27948340, 27948345, 27949351];
  start = new Date('Apr 15 2024 00:00:00 GMT+0400');
  max = new Date();

  // @Cron('*/5 * * * *')
  @Cron('*/30 * * * *')
  getAllUnitsGeoVisits() {
    console.log('cron running');
    return forkJoin(
      this.units.map((unit) => {
        return this.getGeoVisits(unit);
      }),
    ).subscribe();
  }

  getGeoVisits(unit: number) {
    return this.geoVisitsService.findOne(unit).pipe(
      switchMap((res) => {
        console.log(res);
        const params = new URLSearchParams();
        const from = res.exitTime
          ? new Date(res.exitTime)
          : addTime(this.start, 0, 'minute');
        const to = new Date();
        // const to = addTime(
        //   addTime(this.start, 0, 'minute'),
        //   (this.tries + 1) * 30,
        //   'minute',
        // );
        params.append('from', `${unixTimeStamp(from)}`);
        params.append('to', `${unixTimeStamp(to)}`);
        params.append('unit', `${unit}`);
        console.log(unit, from, unixTimeStamp(from), to, unixTimeStamp(to));
        return this.httpService
          .get(this.configService.get('NAFFCO_API_URL') + params, {
            headers: {
              Authorization:
                'Bearer ' + this.configService.get('NAFFCO_API_TOKEN'),
            },
          })
          .pipe(
            map((res) => {
              console.log(res.data.length);
              // if (res.data.length === 0) {
              //   this.tries = this.tries + 1;
              // }
              if (res.data.length > 0) {
                res.data.forEach((visit) => {
                  this.geoVisitsService.create({
                    unitId: unit,
                    geofence: visit.geofence,
                    enterTime: visit.timeInUTC,
                    exitTime: visit.timeOutUTC,
                    from,
                    to,
                  });
                });
                // this.skip = this.skip + this.tries + 1;
                // this.tries = 0;
              }
              return res.data;
            }),
          );
      }),
    );
    // .subscribe();
  }
}
