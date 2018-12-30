import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  login(username, password) {
    ...;
    this.http.post(url, {
      username: ...,
      password: ...,
    })
  }
}
