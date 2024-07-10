import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, from, Observable, switchMap } from 'rxjs';
import { AuthService } from './auth.service';
import { Constants } from '../shared/constants';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private _authService: AuthService, private _router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): any {
    if (req.url.startsWith(Constants.apiRoot)) { //if some APIs dont need Access tokens
      return from(
        this._authService.getAccessToken()
          .then(token => {
            if (token == null)
              token = "";
            const headers = req.headers.set('Authorization', `Bearer ${token}`);
            const authRequest = req.clone({ headers });
            return next.handle(authRequest)
              .pipe(catchError((err: HttpErrorResponse) => {
                if (err && (err.status === 401 || err.status === 403)) {
                  this._router.navigate(['/unauthorized']);
                }
                throw 'error in a request ' + err.status;
              }))
              .toPromise();
          })
      );
    }
    else {
      return next.handle(req);
    }
  }
}
