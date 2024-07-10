import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrl: './unauthorized.component.scss'
})
export class UnauthorizedComponent implements OnInit {

  public isUserAuthenticated: boolean = false;

  constructor(private _authService: AuthService) {
    this._authService.loginChanged
      .subscribe(res => {
        this.isUserAuthenticated = res;
      })
  }

  ngOnInit(): void {
    this._authService.isAuthenticated()
      .then(isAuth => {
        this.isUserAuthenticated = isAuth;
      })
  }

  public login = () => {
    this._authService.login();
  }

  public logout = () => {
    this._authService.logout();
  }

}
