import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '@services/authentication.service';
import { User } from '@models/user';
import { Role } from '@models/role.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      let currentUser: User = this.authenticationService.currentUser();
      console.log(currentUser);
      if (route.data.roles && route.data.roles.indexOf(currentUser.role) === -1) {
        this.router.navigate(['/']);
        return false;
      } else {
        if (route.data.roles === Role['Simple']) {
          this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } })
          return false;
        }
      }
      return true;
  }

}
