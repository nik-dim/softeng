import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '@services/product.service';
import { Product } from '@models/product';
import { MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: Product[];
  dataSource;

  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = [
    'name',
    'category',
    'description',
    '_id',
  ]

  constructor(
    private router: Router,
    private productService: ProductService,
  ) { }

  ngOnInit() {
    this.initProducts();
  }

  private initProducts() {
    this.productService.getProducts()
    .subscribe(products => {
      this.products = products.map(product => {
        return new Product(product);
      });
      this.dataSource = new MatTableDataSource(this.products);
      this.dataSource.sort = this.sort;
    });
  }

}
