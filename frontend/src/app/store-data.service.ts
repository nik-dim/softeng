import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Store } from './store';

@Injectable({
  providedIn: 'root'
})
export class StoreDataService {

  private storeUrl = 'http://localhost:8080/store';

  constructor(
    private http: HttpClient
  ) { }

  public getStores(): Observable<Store[]> {
    return this.http.get<Store[]>(this.storeUrl)
    .pipe(
      catchError(this.handleError('get all stores', []))
    );
  }

  public getStore(id: number): Observable<Store> {
    const url = `${this.storeUrl}/${id}`;
    return this.http.get<Store>(url)
    .pipe(
      catchError(this.handleError<Store>(`get store by id ${id}`))
    );
  }

  public addStore(store: Store): Observable<Store> {
    return this.http.post<Store>(this.storeUrl, store)
    .pipe(
      catchError(this.handleError<Store>(`trying to add store by id ${store.id}`))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      console.log(operation);
      return of(result as T);
    }
  }

}
