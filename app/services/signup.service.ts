import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { User } from '@models/user';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  private signupsUrl = 'http://localhost:8765/users';

  constructor(
    private http: HttpClient
  ) { }

  public addsignup(email: string, password: string): Observable<User> {
    return this.http.post<User>(this.signupsUrl, {
      email: email,
      password: password
    });
  }
}
