import { Injectable } from '@angular/core';
import { CharactersRestService } from './characters-rest.service';

@Injectable({
  providedIn: 'root'
})
export class CharactersDataManagementService {

  constructor(protected rest: CharactersRestService) { 

  }

  getCharactersId(id: number){
      this.rest.getCharacterId(id).subscribe(res => {console.log(res)})
  }
}
