import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, switchMap } from 'rxjs';
import { AuthService } from './auth.service';
import { Constants } from '../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private _authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): any {
    debugger;
    if (req.url.startsWith(Constants.apiRoot)) { //if some APIs dont need Access tokens
      return from(
        this._authService.getAccessToken()
          .then(token => {
            const headers = req.headers.set('Authorization', `Bearer ${token}`);
            const authRequest = req.clone({ headers });
            return next.handle(authRequest).toPromise();
          })
      );
    }
    else {
      return next.handle(req);
    }
  }
}
