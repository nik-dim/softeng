import { Product } from "./product";

export class Tag {

    id: number;
    value: string;
    products: Product[];
  
    constructor(options?: {
        id?: number,
        value?: string
    }) {
      for (let attr in options)
        this[attr] = options[attr];
      //if (this.dateofBirth)
      //  this.dateofBirth = new Date(this.dateofBirth);
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
        products: this.products ? this.products.toString() : ""
      });
    }
  
  }
  

