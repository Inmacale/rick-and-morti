import { Injectable } from '@angular/core';
import { CharactersRestService } from './characters-rest.service';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharactersDataManagementService {

  favoriteList: any[]= [];


  constructor(protected rest: CharactersRestService) {

  }

  getCharactersFindId(id: number): Promise<any> {
    return lastValueFrom(this.rest.getCharacterId(id))
      .then((res: any) => {
        return res; // Puedes devolver el resultado si es necesario
      })
      .catch(error => {
        console.error(error);
        throw error; // Puedes manejar el error aquí o lanzarlo para que se maneje en el nivel superior
      });
  }

  getCharactersFindAll(path?: string): Promise<any> {
    return lastValueFrom(this.rest.getCharacterAll(path))
      .then((res: any) => {
        console.log(res);
        return res; // Puedes devolver el resultado si es necesario
      })
      .catch(error => {
        console.error(error);
        throw error; // Puedes manejar el error aquí o lanzarlo para que se maneje en el nivel superior
      });
  }



  isFavorite(item: any):boolean{
    let itemFound = this.favoriteList.find(elem=> elem.id === item?.id);

    if(itemFound){
      return true;
    }else {
      return false;
    }
  }

  deleteFavoriteList(character: any){

    let itemFound = this.favoriteList.find(elem=> elem.id === character.id);

    const index = this.favoriteList.indexOf(itemFound);
    if(index !== -1){
      this.favoriteList.splice(index,1);
    }
    console.log(this.favoriteList);
  }
  addFavoriteList(character: any){
    this.favoriteList.push(character);

    console.log(this.favoriteList);
  }
}