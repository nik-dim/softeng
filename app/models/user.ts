export class User {
    _id: number;
    email: string;
    password: string;
    role: string;

    constructor(options: {
        _id?: number;
        email: string;
        password: string;
        role: string;
    }) {
        if ("_id" in options)
            this._id = options._id;
            this.email = options.email;
            this.password = options.password;
            this.role = options.role;
    }
    
    toJSON() {
        return Object.assign({}, this);
    }

}
