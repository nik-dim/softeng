import { Component, OnInit } from '@angular/core';

import { Shop } from '@models/shop';
import { ShopService } from '@services/shop.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shop-detail',
  templateUrl: './shop-detail.component.html',
  styleUrls: ['./shop-detail.component.scss']
})
export class ShopDetailComponent implements OnInit {

  shop: Shop;

  constructor(
    private shopService: ShopService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get("id");
    this.getShop(id);
  }

  public getShop(id: number) {
    this.shopService.getShop(id)
    .subscribe(shop => this.shop = shop);
  }

}
