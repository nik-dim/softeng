import { Shop } from "@models/shop";

export interface Geometry {
  type: string;
  coordinates: number[];
}

export interface GeoJsonI {
  type: string;
  geometry: Geometry;
  properties?: any;
}

export class GeoJson implements GeoJsonI {
  type = 'Feature';
  geometry: Geometry;

  constructor(coordinates, public properties?) {
    this.geometry = {
      type: 'Point',
      coordinates: coordinates
    };
    this.properties["marker-color"] = '#3bb2d0';
    this.properties["marker-size"] = 'large';
    this.properties["marker-symbol"] = 'rocket';
  }

  public toShop(): Shop {
    return new Shop({
      name: this.properties.name,
      lng: this.geometry.coordinates[1],
      lat: this.geometry.coordinates[0],
      brand: this.properties.brand
    });
  }

}

export class FeatureCollection {
  type = 'FeatureCollection';

  constructor(public features: Array<GeoJson>) {}

}
