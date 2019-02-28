import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '@models/user';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = 'http://localhost:8765/users';  // user   ??

  constructor(    
    private http: HttpClient
    ) { }


  //get_users sto backend
  public getUsers(): Observable<User[]> {
      return this.http.get<any>(this.url + "?count=4000")
                 .pipe(map(res => res.shops));
  }
}
