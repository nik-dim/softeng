import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { Product } from '@models/product';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  env = environment;
  url: string;

  constructor(
    private http: HttpClient,
  ) { 
    this.url = `${this.env.api.url}/products`;
  }

  public getProducts(): Observable<Product[]> {
    return this.http.get<any>(`${this.url}/?count=4000`)
    .pipe(map(result => result.products));
  }

  public addProduct(product: Product): Observable<any> {
    return this.http.post<Product>(this.url, product);
  }

}
