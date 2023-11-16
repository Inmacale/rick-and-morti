import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PersistenceService {

  constructor() { }

  public getFromLocalStorage(key: string): any {
    const storedData = localStorage.getItem(key);
    if (storedData) {
      return JSON.parse(storedData);
    } else {
      return [];
    }
  }

  public setToLocalStorage(key:string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
