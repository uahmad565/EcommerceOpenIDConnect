import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { UserManager, User, UserManagerSettings } from 'oidc-client';
import { Constants } from '../shared/constants';
import { Subject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _userManager: UserManager;
  public _user: User | null = null;

  //We need to do one additional thing. As soon as the user’s status changes, 
  //we want to inform any component that needs that kind of information. To do that, we are going to use an Observable:
  private _loginChangedSubject = new Subject<boolean>();
  public loginChanged = this._loginChangedSubject.asObservable();

  private get idpSettings(): UserManagerSettings {
    return {
      authority: Constants.idpAuthority,
      client_id: Constants.clientId,
      redirect_uri: `${Constants.clientRoot}/signin-callback`,
      scope: "openid profile basicEcommerceWebApi",
      response_type: "code",
      post_logout_redirect_uri: `${Constants.clientRoot}/signout-callback`,
      automaticSilentRenew: true,
      silent_redirect_uri: `${Constants.clientRoot}/assets/silent-callback.html`
    }
  }

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    console.log("auth service constructor called..q");
    // if (isPlatformBrowser(this.platformId)) {
    this._userManager = new UserManager(this.idpSettings);
    // }
    this._userManager.events.addAccessTokenExpired(_ => {
      this._loginChangedSubject.next(false);
    });

  }


  public isAuthenticated = (): Promise<boolean> => {
    return this._userManager.getUser() //get User From local storage
      .then((user) => {
        if (this._user !== user) {
          this._loginChangedSubject.next(this.checkUser(user))
        }

        this._user = user;
        return this.checkUser(user);
      })
  }

  private checkUser = (user: User | null): boolean => {
    return !!user && !user.expired;
  }

  public login = () => {
    // Additionally, the UserManager stores a user result in the session storage after a successful login action 
    // and we can always retrieve that object and use all the information it contains.
    return this._userManager.signinRedirect();
  }

  public finishLogin = (): Promise<User> => {
    return this._userManager.signinRedirectCallback()
      .then((user: User) => {
        console.log("finishLogin() called user info: ", user);
        this._user = user;
        this._loginChangedSubject.next(this.checkUser(user));
        return user;
      })
  }

  public logout = () => {
    this._userManager.signoutRedirect();
  }

  public finishLogout = () => {
    this._user = null;
    this._loginChangedSubject.next(false);
    return this._userManager.signoutRedirectCallback();
  }

  public getAccessToken = (): Promise<string | null> => {
    return this._userManager.getUser()
      .then((user) => {
        return !!user && !user.expired ? user.access_token : null;
      })
  }
}
