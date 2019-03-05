export class Product {
  _id?: number;
  name: string;
  description: string;
  category: string;
  tags: string[];
  withdrawn?: boolean;

  constructor(options?: {
    _id?: number,
    name: string,
    description: string,
    category: string,
    tags: string[],
    withdrawn?: boolean,
  }) {
    if ("_id" in options)
      this._id = options._id;
    this.name = options.name;
    this.description = options.description;
    this.category = options.category;
    this.tags = options.tags;
    if ("withdrawn" in options)
      this.withdrawn = options.withdrawn;
  }
}
