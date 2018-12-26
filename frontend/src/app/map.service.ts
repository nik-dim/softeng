import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
// import { readFileSync } from 'fs';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

import * as mapboxgl from 'mapbox-gl';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  geojson: string = 'assets/greek-gas-stations.geojson';

  constructor(private http: HttpClient) {
    mapboxgl.accessToken = environment.mapbox.accessToken;
  }

  getData() {
    return this.http.get(this.geojson);
  }

}
