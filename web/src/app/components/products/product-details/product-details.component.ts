import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '@services/product.service';
import { PriceService } from '@services/price.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  loading = true;
  prices: any[];
  data;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  pColumns = [
    'product',
    'shop',
    'price',
  ];

  constructor(
    private productService: ProductService,
    private priceService: PriceService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.priceService.getPriceByProduct(id)
    .subscribe(prices => {
      this.prices = prices;
      this.data = new MatTableDataSource(this.prices);
      this.data.sort = this.sort;
      this.data.paginator = this.paginator;
      this.loading = false;
    });
  }

}
