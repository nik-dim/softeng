import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '@models/user';
import { Role } from '@models/role.enum';
import { environment } from '@environments/environment';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private user: User;
  private url = environment.api.url;
  private decoder = new JwtHelperService();

  constructor(private http: HttpClient) { 
    this.user = new User();
    this.user.role = Role['Simple'];
  }

  public currentUser(): User {
    return this.user;
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${this.url}/login`, {
      username: username,
      password: password
    }).pipe(map(answer => {
      if (answer && answer.token) {
        let d = this.decoder.decodeToken(answer.token);
        this.user.token = answer.token;
        this.user._id = d.userId;
        this.user.role = d.role;
        this.user.email = d.email;
        console.log(this.user);
      }
      return answer;
    }));
  }

  logout() {
    return this.http.post<any>(`${this.url}/logout`, {
      token: this.user.token,
    });
  }

  reset() {
    this.user = new User();
    this.user.role = Role['Simple'];
  }

  signup(credentials) {
    return this.http.post<any>(`${this.url}/signup`, credentials);
  }

  isLoggedIn() {
    if (['User', 'Admin'].indexOf(this.user.role) !== -1)
      return true;
    return false;
  }

}
