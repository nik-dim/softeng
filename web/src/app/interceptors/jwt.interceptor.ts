import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '@services/authentication.service';
import { Router } from '@angular/router';
import { User } from '@models/user';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private authenticationService: AuthenticationService,
  ) {  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let currentUser: User = this.authenticationService.currentUser();
    if (currentUser && currentUser.token) {
      req = req.clone({
        setHeaders: {
          'X-OBSERVATORY-AUTH': currentUser.token
        }
      });
    }

    return next.handle(req);
  }

}
