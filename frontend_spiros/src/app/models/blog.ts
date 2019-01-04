export class Blog {

  id: number;
  title: string;
  content: string;
  date: Date;

  constructor(options?: {
    id?: number,
    title?: string,
    content?: string,
    date?: string
  }) {
    for (let attr in options)
      this[attr] = options[attr];
    if (this.date)
      this.date = new Date(this.date);
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
      date: this.date ? this.date.toString() : ""
    });
  }

}
