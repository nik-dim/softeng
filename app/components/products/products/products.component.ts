import { Component, OnInit } from '@angular/core';
import { Product } from '@models/product';
import { ProductService } from '@services/product.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: Product[];

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.getProducts();
  }

  private getProducts() {
    this.productService.getProducts()
    .subscribe(data => {
      this.products = data.map((product) => {
        return new Product(JSON.parse(JSON.stringify(product)))
      });
      console.log(this.products);
    });
  }

}
