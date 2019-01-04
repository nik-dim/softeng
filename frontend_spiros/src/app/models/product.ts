import { Tag } from "./tag";

export class Product {

    id: number;
    name: string;
    description: string;
    category: string;
    withdrawn : boolean;
    tags :  Array<Tag> ;
    

  
    constructor(options?: {
      id?: number,
      name?: string,
      description?: string,
      category?: string,
      withdrawn?: boolean,
      tags?:  Array<Tag>,
      
    }) {
      for (let attr in options)
        this[attr] = options[attr];
     
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
      });
    }
  
  }
  