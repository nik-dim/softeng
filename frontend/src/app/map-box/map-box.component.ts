import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { MapService } from '../map.service';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import * as turf from '@turf/turf'

@Component({
  selector: 'app-map-box',
  templateUrl: './map-box.component.html',
  styleUrls: ['./map-box.component.scss']
})

export class MapBoxComponent implements OnInit {

  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/light-v9';
  lat = 37.971786;
  lng = 23.622641;

  markers: any;

  constructor(private mapService: MapService) {  }

  ngOnInit() {
    this.mapService.getData()
    .subscribe(markers => {
      this.markers = JSON.parse(JSON.stringify(markers));
    });
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
      zoom: 8,
      center: [this.lng, this.lat]
    });

    this.map.on('load', (event) => {
      this.map.addLayer({
        id: 'locations',
        type: 'symbol',
        source: {
          type: 'geojson',
          data: this.markers
        },
        layout: {
          'icon-image': 'marker-15',
          'icon-allow-overlap': true
        }
      });
      this.buildLocationList(this.markers);
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
        var selectedFeature = clickedPoint.properties.name;

        for (var i = 0; i < this.markers.features.length; i++) {
          if (this.markers[i].properties.address === selectedFeature) {
            var selectedFeatureIndex = i;
          }
        }
        // Select the correct list item using the found index and add the active class
        var listing = document.getElementById('listing-' + selectedFeatureIndex);
        listing.classList.add('active');
      }
    });

    //var marker = new mapboxgl.Marker() // Initialize a new marker
    //.setLngLat([23.622641, 37.971786]) // Marker [lng, lat] coordinates
    //.addTo(this.map); // Add the marker to the map

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

        var options = { units: 'miles' };
        this.markers.features.forEach(function(store) {
          Object.defineProperty(store.properties, 'distance', {
            value: turf.distance(searchResult, store.geometry, options),
            writable: true,
            enumerable: true,
            configurable: true
          });
        });
        var myJson = JSON.stringify(this.markers);
        console.log(myJson);

        this.markers.features.sort(function(a, b) {
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

        this.buildLocationList(this.markers);
      });
    });

  }

  private buildLocationList(data) {
    // Iterate through the list of stores
    for (var i = 0; i < data.features.length; i++) {
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
      var link = listing.appendChild(document.createElement('a'));
      link.href = '#';
      link.className = 'title';
      (link as any).dataPosition = i;
      link.innerHTML = prop.name;

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
