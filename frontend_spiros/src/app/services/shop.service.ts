import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Shop } from '@models/shop';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  private shopsUrl = 'http://localhost:8080/shops';

  constructor(
    private http: HttpClient
  ) { }

  public getShops(): Observable<Shop[]> {
    return this.http.get<Shop[]>(this.shopsUrl)
  }

  public getShop(id: number): Observable<Shop> {
    const url = `${this.shopsUrl}/${id}`;
    return this.http.get<Shop>(url);
  }

}
