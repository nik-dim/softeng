import { Component, OnInit } from '@angular/core';

import { Store } from '../store';
import { StoreDataService } from '../store-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-store-detail',
  templateUrl: './store-detail.component.html',
  styleUrls: ['./store-detail.component.scss']
})
export class StoreDetailComponent implements OnInit {

  store: Store;

  constructor(
    private storeService: StoreDataService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get("id");
    this.getStore(id);
  }

  public getStore(id: number) {
    this.storeService.getStore(id)
    .subscribe(store => this.store = store);
  }

}
