import { Component, OnInit } from '@angular/core';
import { Shop } from '@models/shop';
import { ShopService } from '@services/shop.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.scss']
})
export class ShopsComponent implements OnInit {

  shops: Shop[];
  public searchText : string;

  constructor(
    private shopService: ShopService
  ) { }

  ngOnInit() {
    this.getShops();
  }

  private getShops() {
    this.shopService.getShops()
    .subscribe(data => {
      this.shops = data.map((shop) => {
        return new Shop(JSON.parse(JSON.stringify(shop)))
      });
      console.log(this.shops);
    });
  }

}
