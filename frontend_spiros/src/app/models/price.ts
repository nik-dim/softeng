import { Product } from "./product";
import { Shop } from "./shop";
import { Volunteer } from "./volunteer";


export class Price {

  product: Product;
  shop: Shop;
  volunteer: Volunteer;
  timestamp: Date ;
  value: number ;

  constructor(options?: {
    product?: Product,
    shop?: Shop,
    volunteer?: Volunteer,
    timestamp?: string,
    value: number
  }) {
    for (let attr in options)
      this[attr] = options[attr];
    if (this.timestamp)
      this.timestamp = new Date(this.timestamp);
  }

  /**
   * Used by `JSON.stringify`.
   *
   * We convert the object to a JSON object, so that
   * it can be correctly sent to the backend.
   *
   * @return object - A new instance of this.
   */
  toJSON() {
    return Object.assign({}, this, {
      /* here we stringify complex objects */
      date: this.timestamp ? this.timestamp.toString() : ""
    });
  }

}
