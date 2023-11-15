import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PersistenceService {

  private localStorageKey = 'favoriteList';
  constructor() { }

  public loadFavoriteListFromLocalStorage(): any[] {
    const storedData = localStorage.getItem(this.localStorageKey);
    if (storedData) {
      return JSON.parse(storedData);
    } else {
      return [];
    }
  }

  public saveFavoriteListToLocalStorage(favoriteList: any[]) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(favoriteList));
  }
}
