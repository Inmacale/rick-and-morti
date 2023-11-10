import { Injectable } from '@angular/core';
import { CharactersRestService } from './characters-rest.service';

@Injectable({
  providedIn: 'root'
})
export class CharactersDataManagementService {

  constructor(protected rest: CharactersRestService) {

  }

  getCharactersFindId(id: number): Promise<any> {
    return this.rest.getCharacterId(id).toPromise()
      .then(res => {
        console.log(res);
        return res; // Puedes devolver el resultado si es necesario
      })
      .catch(error => {
        console.error(error);
        throw error; // Puedes manejar el error aquí o lanzarlo para que se maneje en el nivel superior
      });
  }

  getCharactersFindAll(): Promise<any> {
    return this.rest.getCharacterAll().toPromise()
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
