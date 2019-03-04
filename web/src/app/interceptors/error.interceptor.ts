import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '@services/authentication.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError((err: HttpErrorResponse) => {
      if ([401, 403].indexOf(err.status) !== -1) {
        if (['Simple'].indexOf(this.authenticationService.currentUser().role))
          return throwError(err.error.message || err.statusText);
        /* logout user */
        this.authenticationService.logout()
        .subscribe(a => {
          this.authenticationService.reset();
          location.reload(true);
        });
      }
      if ([404].indexOf(err.status) !== -1) {
        this.router.navigateByUrl('/not-found', { replaceUrl: true });
      }
      const error = err.error.message || err.statusText;
      return throwError(error);
    }));
  }

}
