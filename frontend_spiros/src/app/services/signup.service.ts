import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { Volunteer } from '@models/volunteer';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  private signupsUrl = 'http://localhost:8080/volunteers';

  constructor(
    private http: HttpClient
  ) { }

  public addsignup(volunteer: Volunteer, password: string): Observable<Volunteer> {
    return this.http.post<Volunteer>(this.signupsUrl, {
      v: volunteer,
      p: password
    });
  }
}
