import { ICountryV2 } from 'src/app/core/interfaces/country.interface';
import { Observable, combineLatest, of } from 'rxjs';
import { Injectable } from '@angular/core';

import { AppUriSettingService } from './../app-settings/app-uri-setting.service';
import { EndPoints } from './../app-settings/end-points';
import { ConnectionService } from './connection.service';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private _regions: Array<string> = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
  ];

  get regions(): Array<string> {
    return [...this._regions];
  }

  constructor(
    private _appUriSetting: AppUriSettingService,
    private _connectionService: ConnectionService
  ) {}

  getCountriesByRegion<T>(
    region: string,
    filters?: string
  ): Observable<Array<T> | []> {
    const filter = filters?.length ? `?fields=${filters}` : '';

    if (!region.length) return of([]);

    return this._connectionService.get<Array<T>>(
      EndPoints.uriBase(
        `${this._appUriSetting.countries.region}/${region}${filter}`
      )
    );
  }

  getFrontierCountriesByCountry<T>(
    codes: string,
    filters?: string
  ): Observable<Array<T> | []> {
    const filter = filters?.length ? `&fields=${filters}` : '';

    if (!codes.length) {
      return of([]);
    }
    console.log('Error?', codes, filters);
    return this._connectionService.get<Array<T>>(
      EndPoints.uriBase(
        `${this._appUriSetting.countries.alpha}?codes=${codes}${filter}`
      )
    );
  }

  getCountryByCode(codes: string): Observable<ICountryV2> {
    return this._connectionService.get<ICountryV2>(
      EndPoints.uriBase(`${this._appUriSetting.countries.alpha}?codes=${codes}`)
    );
  }

  getCountriesByCode(
    borders: string[],
    filters?: string
  ): Observable<ICountryV2[]> {
    if (!borders) {
      return of([]);
    }

    // const requests: Observable<ICountryV2>[] = [];

    // borders.forEach((border) => {
    //   const request = this.getCountryByCode(border);
    //   requests.push(request);
    // });

    // return combineLatest(requests);

    const filter = filters?.length ? `&fields=${filters}` : '';

    const borderCodes = borders.join(',');

    return this._connectionService.get<ICountryV2[]>(
      EndPoints.uriBase(
        `${this._appUriSetting.countries.alpha}?codes=${borders}${filter}`
      )
    );
  }
}
