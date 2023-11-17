import { Injectable } from '@angular/core';
import { CharactersRestService } from './rest.service';
import { lastValueFrom } from 'rxjs';
import { PersistenceService } from './persistence.service';

@Injectable({
  providedIn: 'root'
})
export class DataManagementService {


  favoriteListCharacters: any[] = [];
  favoriteListEpisodes: any[] = [];
  favoriteListLoctions: any[] = [];

  constructor(protected rest: CharactersRestService, private persistenceService: PersistenceService) {

    this.favoriteListCharacters = this.persistenceService.getFromLocalStorage('characters');
    this.favoriteListEpisodes = this.persistenceService.getFromLocalStorage('episode');
    this.favoriteListLoctions = this.persistenceService.getFromLocalStorage('location');
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
    console.log(path);
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

  isFavorite(option: string, item: any): boolean {
    switch (option) {
      case 'characters':
        return this.isFavoriteForOption(this.favoriteListCharacters, item);

      case 'episode':
        return this.isFavoriteForOption(this.favoriteListEpisodes, item);

      case 'location':
        return this.isFavoriteForOption(this.favoriteListLoctions, item);
      default:
        console.error('Opción no valido');
        return false;

    }
  }

  isFavoriteForOption(list: any[], item: any): boolean {
    let itemFound = list.find(elem => elem.id === item?.id);
    if (itemFound) {
      return true;
    } else {
      return false;
    }
  }


  deleteListForOption(list: any[], option: string, item: any) {

    let itemFound = list.find(elem => elem.id === item.id);
    const index = list.indexOf(itemFound);
    if (index !== -1) {
      list.splice(index, 1);
    }
    this.persistenceService.setToLocalStorage(option, list);
  }


  deleteFavoriteList(option: string, item: any) {
    switch (option) {
      case 'characters':
        this.deleteListForOption(this.favoriteListCharacters, option, item);
        break;
      case 'episode':
        this.deleteListForOption(this.favoriteListEpisodes, option, item);
        break;
      case 'location':
        this.deleteListForOption(this.favoriteListLoctions, option, item);
        break;
    }


  }

  addFavoriteList(option: string, item: any) {

    switch (option) {
      case 'characters':
        this.favoriteListCharacters.push(item);
        this.persistenceService.setToLocalStorage(option, this.favoriteListCharacters);
        break;
      case 'episode':
        this.favoriteListEpisodes.push(item);
        this.persistenceService.setToLocalStorage(option, this.favoriteListEpisodes);
        break;
      case 'location':
        this.favoriteListLoctions.push(item);
        this.persistenceService.setToLocalStorage(option, this.favoriteListLoctions);
        break;
      default:
        throw new Error('Opción no valido')
    }
  }

  getFavoriteList(option: string): any[] {

    switch (option) {
      case 'characters':
        return this.favoriteListCharacters;
      case 'episode':
        return this.favoriteListEpisodes;
      case 'location':
        return this.favoriteListLoctions;
      default:
        console.error('Opción no valido');
        return [];


    }

  }
}