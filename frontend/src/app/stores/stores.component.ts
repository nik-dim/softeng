import { Component, OnInit } from '@angular/core';

import { Store } from '../store';
import { StoreDataService } from '../store-data.service';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss']
})
export class StoresComponent implements OnInit {

  stores: Store[];

  constructor(
    private storeService: StoreDataService
  ) { }

  ngOnInit() {
    this.getStores();
  }

  getStores(): void {
    this.storeService.getStores()
    .subscribe(stores => this.stores = stores);
  }

}
