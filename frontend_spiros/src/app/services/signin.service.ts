import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
//import { Signup } from '@models/signup';

@Injectable({
  providedIn: 'root'
})
export class SigninService {

  private signinsUrl = 'http://localhost:8080/signin';

  constructor(
    private http: HttpClient
  ) { }

  //public addsignin(signup: ): Observable<> {
  //  return this.http.post<>(this.signinsUrl,);
  //}
}
