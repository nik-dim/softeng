import { GeoJson } from "./map";

export class Shop {
  _id: number;
  name: string;
  lng: number;
  lat: number;
  brand: string;
  withdrawn: boolean;

  constructor(options: {
    _id?: number;
    name: string;
    lng: number;
    lat: number;
    brand: string;
    withdrawn?: boolean;
  }) {
    if ("_id" in options)
      this._id = options._id;
      this.name = options.name;
      this.lng = options.lng;
      this.lat = options.lat;
      this.brand = options.brand;
    if ("withdrawn" in options)
      this.withdrawn = options.withdrawn;
  }

  toJSON() {
    return Object.assign({}, this);
  }

  toGeoJSON() {
    return new GeoJson(
      [this.lng, this.lat],
      {
        name: this.name,
        brand: this.brand,
        _id: this._id
      }
    );
  }

}
