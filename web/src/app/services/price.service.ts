import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Price } from '@models/price';

@Injectable({
  providedIn: 'root'
})
export class PriceService {

  url = `${environment.api.url}/prices`;

  constructor(
    private http: HttpClient,
  ) { }

  public getPriceByProduct(id): Observable<any[]> {
    let params = new HttpParams()
    .set('products', id)
    .set('dateFrom', '1980-01-01')
    .set('dateTo', '2200-01-01')
    .set('count', '10000');
    return this.http.get<any>(this.url, { params })
    .pipe(map(res => res.prices));
  };

  public getPriceByShop(id): Observable<any[]> {
    let params = new HttpParams()
    .set('shops', id)
    .set('dateFrom', '1980-01-01')
    .set('dateTo', '2200-01-01')
    .set('count', '10000');
    return this.http.get<any>(this.url, { params })
    .pipe(map(res => res.prices));
  }

  public addPrice(price): Observable<any> {
    return this.http.post<Price>(this.url, price as Price);
  }

}
