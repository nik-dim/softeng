export class Signup {

    id: number;
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    phone: string;
    email: string;
    dateofBirth: Date;
    dateofreg: Date;
  
    constructor(options?: {
        id?: number,
        username?: string,
        firstname?: string,
        password?: string,
        lastname?: string,
        phone?: string,
        email?: string,
        dateofBirth?: string,
        dateofreg?: string
    }) {
      for (let attr in options)
        this[attr] = options[attr];
      if (this.dateofBirth)
        this.dateofBirth = new Date(this.dateofBirth);
      if (this.dateofreg)
        this.dateofreg = new Date(this.dateofreg);
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
        date: (this.dateofBirth ? this.dateofBirth.toString() : "",
              this.dateofreg ? this.dateofreg.toString() : "")
      });
    }
  
  }
  
