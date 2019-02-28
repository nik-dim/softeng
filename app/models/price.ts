import { Product } from "./product";
import { User } from "./user";
import { Shop } from "./shop";

export class Price {
    _id: number;
    product: Product;
    user: User;
    shop: Shop;
    value: number;
    timestamp: Date;

    constructor(options: {
        _id?: number;
        product: Product;
        user: User;
        shop: Shop;
        value: number;
        timestamp: Date;
      }) {
        if ("_id" in options)
          this._id = options._id;
          this.product = options.product;
          this.user = options.user;
          this.shop = options.shop;
          this.value = options.value;
          this.timestamp = options.timestamp;
      }

      toJSON() {
        return Object.assign({}, this);
      }
}
