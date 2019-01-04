import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Volunteer } from '@models/volunteer';

@Injectable({
  providedIn: 'root'
})
export class VolunteerService {

  private volunteersUrl = 'http://localhost:8080/volunteers';

  constructor(
    private http: HttpClient
  ) { }

  public getVolunteers(): Observable<Volunteer[]> {
    return this.http.get<Volunteer[]>(this.volunteersUrl)
  }

  public getVolunteer(id: number): Observable<Volunteer> {
    const url = `${this.volunteersUrl}/${id}`;
    return this.http.get<Volunteer>(url);
  }

  //public addBlog(blog: Blog): Observable<Blog> {
  //  return this.http.post<Blog>(this.blogsUrl, JSON.parse(JSON.stringify(blog)));
  //}

}
