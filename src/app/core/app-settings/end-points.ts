import { environment } from 'src/environments/environment';

export class EndPoints {
  /**
   * @param {string} url - string - the url to be appended to the base url
   * @returns The baseUrl from the environment.ts file and the url from the service.ts file.
   */
  static uriBase(url: string): string {
    return `${environment.baseUrlV2}/${url}`;
  }
}
