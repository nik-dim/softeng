import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '@models/product';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url = 'http://localhost:8765/products';

  constructor(
    private http: HttpClient
  ) { }

  public getProducts(): Observable<Product[]> {
    return this.http.get<any>(this.url + "?count=4000")
               .pipe(map(res => res.products));
  }

  public getProduct(id: number): Observable<Product> {
    const url = `${this.url}/${id}`;
    return this.http.get<Product>(url);
  }
}
