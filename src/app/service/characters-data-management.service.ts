import { Injectable } from '@angular/core';
import { CharactersRestService } from './characters-rest.service';

@Injectable({
  providedIn: 'root'
})
export class CharactersDataManagementService {

  constructor(protected rest: CharactersRestService) {

  }

  getCharactersFindId(id: number) {
    return this.rest.getCharacterId(id).subscribe(res => { console.log(res) })
  }

  getCharactersFindAll() {
    return this.rest.getCharacterAll().subscribe(res => { console.log(res) })
  }

}
