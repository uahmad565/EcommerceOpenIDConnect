import { Component } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin-redirect-callback',
  template: `<div></div>`
})
export class SigninRedirectCallbackComponent {

  constructor(private _authService: AuthService, private _router: Router) { }

  ngOnInit(): void {
    this._authService.finishLogin()
    .then(_ => {
      this._router.navigate(['/categories'], { replaceUrl: true });
    })
  }
}
