import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class AbstractService {

  constructor(protected http: HttpClient) { }

    // Un método abstracto que devuelve la URL base de la API
    abstract getBaseUrl(): string;

    // Un método para hacer una petición GET a una ruta específica
    protected getAll<T>(path: string): Observable<T> {
      // Se concatena la URL base con la ruta
      const url = path;
      // Se retorna el resultado de la petición como un observable
      return this.http.get<T>(url);
    }

    protected getId<T>(path: string,id: number): Observable<T> {
      // Se concatena la URL base con la ruta
      const url = path + id;
      // Se retorna el resultado de la petición como un observable
      return this.http.get<T>(url);
    }
  
    // Un método para hacer una petición POST a una ruta específica con un cuerpo
    protected post<T>(path: string, body: any): Observable<T> {
      // Se concatena la URL base con la ruta
      const url =  path;
      // Se retorna el resultado de la petición como un observable
      return this.http.post<T>(url, body);
    }
  
    // Un método para hacer una petición PUT a una ruta específica con un cuerpo
    protected put<T>(path: string, body: any): Observable<T> {
      // Se concatena la URL base con la ruta
      const url = path;
      // Se retorna el resultado de la petición como un observable
      return this.http.put<T>(url, body);
    }
  
    // Un método para hacer una petición DELETE a una ruta específica
    protected delete<T>(path: string): Observable<T> {
      // Se concatena la URL base con la ruta
      const url = this.getBaseUrl() + path;
      // Se retorna el resultado de la petición como un observable
      return this.http.delete<T>(url);
    }

}
