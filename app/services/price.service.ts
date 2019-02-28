import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Price } from '@models/price';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PriceService {

  private url = 'http://localhost:8765/prices';

  constructor(
    private http: HttpClient
  ) { }

  public getPrices(): Observable<Price[]> {
    return this.http.get<any>(this.url + "?count=4000")
               .pipe(map(res => res.prices));
  }
}
