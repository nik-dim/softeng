import { Component, OnInit } from '@angular/core';
import { FeatureCollection, GeoJson } from '@models/map';
import * as mapboxgl from 'mapbox-gl';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import * as turf from '@turf/turf';
import { ShopService } from '@services/shop.service';
import { Shop } from '@models/shop';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/outdoors-v9';
  lat = 37.971786;
  lng = 23.622641;

  shops: Shop[];
  geojson: FeatureCollection;

  constructor(private shopService: ShopService) { 
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
    console.log(this.geojson);

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
      this.map.addLayer({
        id: 'locations',
        type: 'symbol',
        source: {
          type: 'geojson',
          data: this.geojson
        },
        layout: {
          'icon-image': 'marker-15',
          'icon-allow-overlap': true
        }
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
        this.lng = event.coords.longitude;
        this.lat = event.coords.latitude;

        console.log(this.lng);
        console.log(this.lat);

        /*-----------------   Make this a function -------------------------*/
        var location = turf.point([this.lng, this.lat]);

        this.geojson.features.forEach(function(store) {
          Object.defineProperty(store.properties, 'distance', {
            value: turf.distance(location, store.geometry),
            writable: true,
            enumerable: true,
            configurable: true
          });
        });
        var myJson = JSON.stringify(this.geojson);
        console.log(myJson);

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

        var listings = document.getElementById('listings');
        while (listings.firstChild) {
          listings.removeChild(listings.firstChild);
        }

        this.buildLocationList(this.geojson);
        //--------------------------------------------------------------------
      });
      

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
        var activeItem = document.getElementsByClassName('active');
        if (activeItem[0]) {
          activeItem[0].classList.remove('active');
        }
        // Find the index of the store.features that corresponds to the clickedPoint that fired the event listener
        //var selectedFeature1 = clickedPoint.properties.name;
        var selectedFeature = clickedPoint.properties._id;

        for (var i = 0; i < this.geojson.features.length; i++) {
          if (this.geojson.features[i].properties._id === selectedFeature) {
            var selectedFeatureIndex = i;
          }
        }
        // Select the correct list item using the found index and add the active class
        var listing = document.getElementById('listing-' + selectedFeatureIndex);
        listing.classList.add('active');
        console.log(listing)
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
          'circle-color': '#007cbf',
          'circle-stroke-width': 3,
          'circle-stroke-color': '#fff'
        }
      });
  
      // Listen for the `result` event from the Geocoder
      // `result` event is triggered when a user makes a selection
      // Add a marker at the result's coordinates
      geocoder.on('result', (event) => {
        var searchResult = event.result.geometry;
        this.map.getSource('single-point').setData(searchResult);
        console.log(searchResult);

        //var options = { units: 'kilometers' };
        this.geojson.features.forEach(function(store) {
          Object.defineProperty(store.properties, 'distance', {
            value: turf.distance(searchResult, store.geometry),
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

        var listings = document.getElementById('listings');
        while (listings.firstChild) {
          listings.removeChild(listings.firstChild);
        }

        this.buildLocationList(this.geojson);
      });
    });

  }

  private buildLocationList(data) {
    // Iterate through the list of stores
    for (var i = 0; i < 10; i++) {
      var currentFeature = data.features[i];
      // Shorten data.feature.properties to just `prop` so we're not
      // writing this long form over and over again.
      var prop = currentFeature.properties;
      // Select the listing container in the HTML and append a div
      // with the class 'item' for each store
      var listings = document.getElementById('listings');
      var listing = listings.appendChild(document.createElement('div'));
      listing.className = 'item';
      listing.id = 'listing-' + i;

      // Create a new link with the class 'title' for each store
      // and fill it with the store address
      let link = listing.appendChild(document.createElement('a'));
      link.className = 'title';
      (link as any).dataPosition = i;
      link.innerHTML = prop.name;

      // Event listener
      // Add an event listener for the links in the sidebar listing
     link.addEventListener('click', (event) => {
        // Update the currentFeature to the store associated with the clicked link
        var clickedListing = data.features[(link as any).dataPosition];
        console.log(clickedListing);
        // 1. Fly to the point associated with the clicked link
        this.flyToStore(clickedListing);
        // 2. Close all other popups and display popup for clicked store
        this.createPopUp(clickedListing);
        // 3. Highlight listing in sidebar (and remove highlight for all other listings)
        var activeItem = document.getElementsByClassName('active');
        if (activeItem[0]) {
          activeItem[0].classList.remove('active');
        }
        listing.classList.add('active');
      });

      //----------------------------------------------------------------------------------------------------

      if (prop.distance) {
        var roundedDistance = Math.round(prop.distance * 100) / 100;
        var details = listing.appendChild(document.createElement('div'));
        details.innerHTML += '<p><strong>' + roundedDistance + ' km away</strong></p>';
      }
      
      //******For Extra Information in the List ******/
      // Create a new div with the class 'details' for each store
      // and fill it with the city and phone number
      //var details = listing.appendChild(document.createElement('div'));
      //details.innerHTML = prop.city;
      //if (prop.phone) {
      //  details.innerHTML += ' &middot; ' + prop.phoneFormatted;
      //}   
    }
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
  
    var popup = new mapboxgl.Popup({ closeOnClick: false })
      .setLngLat(currentFeature.geometry.coordinates)
      .setHTML('<h3>' + currentFeature.properties.name + '</h3>')
      .addTo(this.map);
  }

}
