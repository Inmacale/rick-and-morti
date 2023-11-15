import { Injectable } from '@angular/core';
import { CharactersRestService } from './rest.service';
import { lastValueFrom } from 'rxjs';
import { PersistenceService } from './persistence.service';

@Injectable({
  providedIn: 'root'
})
export class DataManagementService {


  favoriteList: any[] = [];

  constructor(protected rest: CharactersRestService, private persistenceService: PersistenceService) {

    this.favoriteList = this.persistenceService.loadFavoriteListFromLocalStorage();
  }

  getFindId(path: string, id: number): Promise<any> {
    return lastValueFrom(this.rest.getId(path, id))
      .then((res: any) => {
        return res; // Puedes devolver el resultado si es necesario
      })
      .catch(error => {
        console.error(error);
        throw error; // Puedes manejar el error aquí o lanzarlo para que se maneje en el nivel superior
      });
  }

  getFindAll(path: string, params?: any): Promise<any> {
    console.log (path);
    return lastValueFrom(this.rest.getAll(path, params))
      .then((res: any) => {
        console.log(res);
        return res; // Puedes devolver el resultado si es necesario
      })
      .catch(error => {
        console.error(error);
        throw error; // Puedes manejar el error aquí o lanzarlo para que se maneje en el nivel superior
      });
  }

  isFavorite(item: any): boolean {
    let itemFound = this.favoriteList.find(elem => elem.id === item?.id);
    if (itemFound) {
      return true;
    } else {
      return false;
    }
  }


  deleteFavoriteList(item: any) {

    let itemFound = this.favoriteList.find(elem => elem.id === item.id);

    const index = this.favoriteList.indexOf(itemFound);
    if (index !== -1) {
      this.favoriteList.splice(index, 1);
    }
    this.persistenceService.saveFavoriteListToLocalStorage(this.favoriteList);

    console.log(this.favoriteList);
  }

  addFavoriteList(item: any) {
    this.favoriteList.push(item);

    this.persistenceService.saveFavoriteListToLocalStorage(this.favoriteList);
    console.log(this.favoriteList);
  }

  getFavoriteList(): any[] {
    return this.favoriteList;
  }
}