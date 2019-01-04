import { Component, OnInit } from '@angular/core';

import { Shop } from '@models/shop';
import { ShopService } from '@services/shop.service';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.scss']
})
export class ShopsComponent implements OnInit {

  shops: Shop[];

  constructor(
    private shopService: ShopService
  ) { }

  ngOnInit() {
    this.getShops();
  }

  getShops(): void {
    this.shopService.getShops()
    .subscribe(shops => this.shops = shops);
  }

}
