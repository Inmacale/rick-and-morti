import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class AbstractService {

  constructor(protected http: HttpClient) { }

  protected get<T>(path: string, params?: any): Observable<T> {
    return this.http.get<T>(path, { params });
  }

  protected post<T>(path: string, body: any): Observable<T> {
    return this.http.post<T>(path, body);
  }

  protected put<T>(path: string, body: any): Observable<T> {
    return this.http.put<T>(path, body);
  }

  protected delete<T>(path: string): Observable<T> {
    return this.http.delete<T>(path);
  }

}
