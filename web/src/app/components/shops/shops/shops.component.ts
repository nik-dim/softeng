import { Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { Shop } from '@models/shop';
import { ShopService } from '@services/shop.service';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.scss']
})
export class ShopsComponent implements OnInit {

  shops: Shop[];
  dataSource;
  brand = "";
  loc = "";

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns = [
    'name',
    'brand',
    'address',
    '_id',
  ];

  constructor(
    private router: Router,
    private shopService: ShopService,
  ) { }

  ngOnInit() {
    this.initShops();
  }

  private initShops() {
    this.shopService.getShops()
    .subscribe(shops => {
      this.shops = shops.map(shop => new Shop(shop));
      this.dataSource = new MatTableDataSource<Shop>(this.shops);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate =
        (data: Shop, filter: any) => {
        if (filter.brand)
          this.brand = filter.brand;
        if (filter.location)
          this.loc = filter.location;
        return (data.brand.trim().toLowerCase().includes(this.brand) &&
                data.address.trim().toLowerCase().includes(this.loc)
               );
      };
    });
  }

  brandFilter(filterValue: string) {
    this.brand = filterValue.trim().toLowerCase();
    this.dataSource.filter = { brand: filterValue.trim().toLowerCase() };
  }

  locFilter(filterValue: string) {
    this.dataSource.filter = { location: filterValue.trim().toLowerCase() };
  }

}
