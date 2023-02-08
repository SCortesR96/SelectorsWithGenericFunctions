import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppUriSettingService {
  public countries = {
    region: `region`,
    alpha: 'alpha',
  };
}
