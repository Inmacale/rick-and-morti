import { Injectable } from '@angular/core';
import { CharactersRestService } from './characters-rest.service';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharactersDataManagementService {

  characters: any[] = []

  constructor(protected rest: CharactersRestService) {

  }

  getCharactersFindId(id: number): Promise<any> {
    return lastValueFrom(this.rest.getCharacterId(id))
      .then(res => {
        console.log(res); this.characters = res.results;
        return res; // Puedes devolver el resultado si es necesario
      })
      .catch(error => {
        console.error(error);
        throw error; // Puedes manejar el error aquí o lanzarlo para que se maneje en el nivel superior
      });
  }

  getCharactersFindAll(): Promise<any> {
    return lastValueFrom(this.rest.getCharacterAll())
      .then(res => {
        console.log(res);
        return res; // Puedes devolver el resultado si es necesario
      })
      .catch(error => {
        console.error(error);
        throw error; // Puedes manejar el error aquí o lanzarlo para que se maneje en el nivel superior
      });
  }

}