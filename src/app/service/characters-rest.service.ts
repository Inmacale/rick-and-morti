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

  public getCharacterId(id: number) {
    return this.get(this.apiUrl + 'character/' + id);
  }

  public getCharacterAll(params?: any) {
    return this.get(this.apiUrl + 'character/', params);
  }


}
