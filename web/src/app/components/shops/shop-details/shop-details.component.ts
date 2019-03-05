import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { PriceService } from '@services/price.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-shop-details',
  templateUrl: './shop-details.component.html',
  styleUrls: ['./shop-details.component.scss']
})
export class ShopDetailsComponent implements OnInit {

  loading = true;
  prices: any[];
  data;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  pColumns = [
    'shop',
    'product',
    'price',
  ];

  constructor(
    private priceService: PriceService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.priceService.getPriceByShop(id)
    .subscribe(prices => {
      this.prices = prices;
      this.data = new MatTableDataSource(this.prices);
      this.data.sort = this.sort;
      this.data.paginator = this.paginator;
      this.loading = false;
    });
  }

}
