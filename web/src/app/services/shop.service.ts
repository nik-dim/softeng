import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Shop } from '@models/shop';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  private url = 'https://localhost:8765/observatory/api/shops';

  constructor(
    private http: HttpClient
  ) {  }

  public getShops(): Observable<Shop[]> {
    return this.http.get<any>(this.url + "?count=4000")
               .pipe(map(res => res.shops));
  }

  public deleteShop(id): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`);
  }

}
