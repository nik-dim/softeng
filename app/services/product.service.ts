import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '@models/product';
import { map } from 'rxjs/operators';
import { Price } from '@models/price';

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

  public getProduct(id: string): Observable<Product> {
    const url = `${this.url}/${id}`;
    return this.http.get<any>(url)
    .pipe(map(res => res.product));
  }

  public postProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.url, JSON.parse(JSON.stringify(product)));
  }

 // not ready
  public getShopsAndPrices(id: string): Observable<any>{
    return this.http.get<any>('http://localhost:8765/prices?products=' + id)
    .pipe(map(res => {res.shopName , res.value}));
  }
}
