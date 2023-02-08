import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConnectionService {
  constructor(private http: HttpClient) {}

  /**
   * It returns an Observable of type T, which is a generic type
   * @param {string} url - The URL to send the request to.
   * @param {any} [params] - The query parameters to be appended to the URL.
   * @returns Observable<T>
   */
  public get<T>(url: string, params?: any): Observable<T> {
    return this.http.get<T>(url, { params });
  }

  /**
   * This function returns an Observable of type T, which is the type of the response body.
   * @param {string} url - The URL to which the request is sent.
   * @param {any} [body] - The body of the POST request.
   * @returns Observable<T>
   */
  public post<T>(url: string, body?: any): Observable<T> {
    return this.http.post<T>(url, body);
  }
}
