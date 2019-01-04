import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Price } from '@models/price';

@Injectable({
  providedIn: 'root'
})
export class PriceService {

  private PriceUrl = 'http://localhost:8080/price';

  constructor(
    private http: HttpClient
  ) { }

  public getPriceByShop(id: number): Observable<Price> {
    const url = `${this.PriceUrl}/${id}`;
    return this.http.get<Price>(url);
  }

  public getPriceByVolunteer(id: number): Observable<Price> {
    const url = `${this.PriceUrl}/${id}`;
    return this.http.get<Price>(url);
  }

  public getPriceByProduct(id: number): Observable<Price> {
    const url = `${this.PriceUrl}/${id}`;
    return this.http.get<Price>(url);
  }
  
}
