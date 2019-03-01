export class Product {
    _id: number;
    name: string;
    price: number;
    description: string;
    category: string;
    withdrawn: boolean;

    constructor(options: {
        _id?: number;
        name: string;
        price: number;
        description: string;
        category: string;
        withdrawn?: boolean;
      }) {
        if ("_id" in options)
          this._id = options._id;
          this.name = options.name;
          this.price = options.price;
          this.description = options.description;
          this.category = options.category;
        if ("withdrawn" in options)
          this.withdrawn = options.withdrawn;
      }
    
      toJSON() {
        return Object.assign({}, this);
      }
}
