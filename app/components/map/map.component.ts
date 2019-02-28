import { Component, OnInit } from '@angular/core';
import { FeatureCollection, GeoJson } from '@models/map';
import * as mapboxgl from 'mapbox-gl';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import * as turf from '@turf/turf';
import { ShopService } from '@services/shop.service';
import { Shop } from '@models/shop';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/outdoors-v9';

  shops: Shop[];
  geojson: FeatureCollection;

  constructor(private shopService: ShopService) { }

  ngOnInit() {
    this.initShops();
  }

  private initShops(): void {
    this.shopService.getShops()
    .subscribe(shops => {
      this.shops = shops.map(shop => {
        return new Shop(JSON.parse(JSON.stringify(shop)));
      });
      this.buildGeoJSON();
    });
  }

  private buildGeoJSON(): void {
    this.geojson = new FeatureCollection(
      this.shops.map(val => {
        return val.toGeoJSON();
      })
    );
    console.log(this.geojson);
  }

}
