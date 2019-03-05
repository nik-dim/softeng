import { Component, OnInit, ViewChild } from '@angular/core';
import { FeatureCollection, GeoJson } from '@models/map';
import * as mapboxgl from 'mapbox-gl';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import * as turf from '@turf/turf';
import { ShopService } from '@services/shop.service';
import { Shop } from '@models/shop';
import { environment } from '../../../environments/environment';
import { AuthenticationService } from '@services/authentication.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  @ViewChild('sidenav')
  sidenav: any;

  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/outdoors-v9';
  lat = 37.971786;
  lng = 23.622641;

  active = true;

  shops: Shop[];
  geojson: FeatureCollection;
  shoplist: any[];

  constructor(
    private shopService: ShopService,
    private auth: AuthenticationService,
  ) { 
    mapboxgl.accessToken = environment.mapbox.accessToken;
  }

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

    this.initialiseMap();
  }

  private initialiseMap() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });
    }
    this.buildMap();
  }

  private buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 10,
      center: [this.lng, this.lat]
    });

    this.map.on('load', (event) => {
      this.sidenav.close();
      this.map.addLayer({
        id: 'locations',
        type: 'circle',
        source: {
          type: 'geojson',
          data: this.geojson
        },
        paint: {
          'circle-radius': 8,
          'circle-color': '#0c4e04',
          'circle-stroke-width': 1,
          'circle-stroke-color': '#fff'
        },
        // layout: {
          // 'icon-image': 'marker-15',
          // 'icon-allow-overlap': true
        // }
      });
      //this.buildLocationList(this.markers);

      // Locate the user
      let locate = new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true,
            watchPosition: true
        },
        trackUserLocation: true
      })
      this.map.addControl(locate);

      locate.on('geolocate', (event) => {
        console.log('geolocate');
        this.sidenav.open();
        this.lng = event.coords.longitude;
        this.lat = event.coords.latitude;

        console.log(this.lng);
        console.log(this.lat);

        var location = turf.point([this.lng, this.lat]);

        this.geojson.features.forEach(function(store) {
          Object.defineProperty(store.properties, 'distance', {
            value: turf.distance(location, store.geometry.coordinates),
            writable: true,
            enumerable: true,
            configurable: true
          });
        });
        var myJson = JSON.stringify(this.geojson);

        this.geojson.features.sort(function(a, b) {
          if (a.properties.distance > b.properties.distance) {
            return 1;
          }
          if (a.properties.distance < b.properties.distance) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });

        //var listings = document.getElementById('listings');
        //while (listings.firstChild) {
        //  listings.removeChild(listings.firstChild);
        //}

        this.buildLocationList(this.geojson);
      });


    });

    /**
     * Change shop size based on zoom level
     */
    this.map.on('zoom', () => {
      this.map.setPaintProperty(
        'locations',
        'circle-radius',
        this.map.getZoom() - 2
      )
    });

    /**
     * Make shops clickable when cursor over them
     */
    this.map.on('mouseenter', 'locations', () => {
      this.map.getCanvas().style.cursor = 'pointer';
    });

    /**
     * Remove clickable if not over shops
     */
    this.map.on('mouseleave', 'locations', () => {
      this.map.getCanvas().style.cursor = '';
    });

    // Add an event listener for when a user clicks on the map
    this.map.on('click', (event) => {
      // Query all the rendered points in the view
      var features = this.map.queryRenderedFeatures(event.point, { layers: ['locations'] });
      if (features.length) {
        var clickedPoint = features[0];
        // 1. Fly to the point
        this.flyToStore(clickedPoint);
        // 2. Close all other popups and display popup for clicked store
        this.createPopUp(clickedPoint);
        // 3. Highlight listing in sidebar (and remove highlight for all other listings)
        // Find the index of the store.features that corresponds to the clickedPoint that fired the event listener
        //var selectedFeature1 = clickedPoint.properties.name;
        var selectedFeature = clickedPoint.properties._id;

        for (var i = 0; i < this.geojson.features.length; i++) {
          if (this.geojson.features[i].properties._id === selectedFeature) {
            var selectedFeatureIndex = i;
          }
        }
      }
    });

    var geocoder = new MapboxGeocoder({ // Initialize the geocoder
      accessToken: mapboxgl.accessToken, // Set the access token
      placeholder: 'Search for Gas Stations in Greece', // Placeholder text for the search bar
    });

    // Add the geocoder to the map
    this.map.addControl(geocoder);

    this.map.on('load', (event) => {
      this.map.addSource('single-point', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: []
        }
      });

      this.map.addLayer({
        id: 'point',
        source: 'single-point',
        type: 'circle',
        paint: {
          'circle-radius': 10,
          'circle-color': '#af1e19',
          'circle-stroke-width': 3,
          'circle-stroke-color': '#fff'
        }
      });

      // Listen for the `result` event from the Geocoder
      // `result` event is triggered when a user makes a selection
      // Add a marker at the result's coordinates
      geocoder.on('result', (event) => {
        this.sidenav.open();
        var searchResult = event.result.geometry;
        this.map.getSource('single-point').setData(searchResult);
        console.log(searchResult);

        //var options = { units: 'kilometers' };
        this.geojson.features.forEach(function(store) {
          Object.defineProperty(store.properties, 'distance', {
            value: turf.distance(searchResult, store.geometry.coordinates),
            writable: true,
            enumerable: true,
            configurable: true
          });
        });
        var myJson = JSON.stringify(this.geojson);
        //console.log(myJson);

        this.geojson.features.sort(function(a, b) {
          if (a.properties.distance > b.properties.distance) {
            return 1;
          }
          if (a.properties.distance < b.properties.distance) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });

        //var listings = document.getElementById('listings');
        //while (listings.firstChild) {
        //  listings.removeChild(listings.firstChild);
        //}

        this.buildLocationList(this.geojson);
        
      });
    });

  }

  private buildLocationList(data) {

    this.shoplist = []
    for (let i = 0; i < 10; i++) {
      let current = data.features[i];
      current.properties.distance = Math.round(
        current.properties.distance * 100
      ) / 100;
      this.shoplist.push(current);
    }
    console.log(this.shoplist);

    // if (prop.distance) {
      // var roundedDistance = Math.round(prop.distance * 100) / 100;
      // var details = listing.appendChild(document.createElement('div'));
      // details.innerHTML += '<p><strong>' + roundedDistance + ' km away</strong></p>';
    // }
  }

  clickShop(data) {
    this.flyToStore(data);
    this.createPopUp(data);
  }

  private flyToStore(currentFeature) {
    this.map.flyTo({
      center: currentFeature.geometry.coordinates,
      zoom: 15
    });
  }

  private createPopUp(currentFeature) {
    var popUps = document.getElementsByClassName('mapboxgl-popup');
    // Check if there is already a popup on the map and if so, remove it
    if (popUps[0]) popUps[0].remove();

    if (this.auth.isLoggedIn()) {
      var popup = new mapboxgl.Popup({ closeOnClick: false })
        .setLngLat(currentFeature.geometry.coordinates)
        .setHTML('<h3><b><a href="shops/' + currentFeature.properties._id + '" target="_self">' + currentFeature.properties.name + '</a></b></h3></br><p><a href="prices/' + currentFeature.properties._id + '" target="_self">Add price</a></p>')
        .addTo(this.map);
    } else {
      var popup = new mapboxgl.Popup({ closeOnClick: false })
        .setLngLat(currentFeature.geometry.coordinates)
        .setHTML('<h3><b><a href="shops/' + currentFeature.properties._id + '" target="_self">' + currentFeature.properties.name + '</a></b></h3>')
        .addTo(this.map);
    }
  }

}
