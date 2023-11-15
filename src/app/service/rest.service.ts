import { Injectable } from '@angular/core';
import { AbstractService } from './abstract.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CharactersRestService extends AbstractService {

  apiUrl = environment.apiUrl;

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }

  public getId(path: string, id: number) {
    return this.get(this.apiUrl + path + id);
  }

  public getAll(path: string, params?: any) {
    return this.get(this.apiUrl + path, params);
  }


}
