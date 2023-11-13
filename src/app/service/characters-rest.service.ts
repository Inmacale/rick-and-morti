import { Injectable } from '@angular/core';
import { AbstractService } from './abstract.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CharactersRestService extends AbstractService {

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }
  // Implementamos el método abstracto que devuelve la URL base de la API
  public getBaseUrl(): string {
    // Retornamos la URL base de la API de usuarios
    return 'https://rickandmortyapi.com/api/character/';
  }

  public getCharacterId(id: number) {
    return this.getId(this.getBaseUrl(), id);

  }

  public getCharacterAll(path?: string) {
    return this.getAll(path ? path : this.getBaseUrl());
  }


}
