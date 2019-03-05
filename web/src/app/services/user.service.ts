import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '@models/user';
import { map } from 'rxjs/operators';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = environment.api.url;

  constructor(
    private http: HttpClient,
  ) { }

  public getUsers(): Observable<User[]> {
    return this.http.get<any>(this.url + "?count=4000")
    .pipe(map(res => res.users));
  }

  public deleteUser(id): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`)
  }

  public updateToAdmin(id): Observable<any> {
    return this.http.patch<any>(`${this.url}/${id}`, {})
  }

}
