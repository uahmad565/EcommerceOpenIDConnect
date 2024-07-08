import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CartDialogComponent } from './components/cart-dialog/cart-dialog.component';
import { CartService } from './Services/cart.service';
import { Constants } from './shared/constants';
import { AuthService } from './Services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'projectwithNgModule';
  public userAuthenticated: boolean = false;

  constructor(public dialog: MatDialog, public cartService: CartService,
    private _authService: AuthService
  ) {

    this._authService.loginChanged.subscribe((userAuthenticated: boolean) => {
      this.userAuthenticated = userAuthenticated;
      console.log("this._authService.loginChanged", userAuthenticated);
    });

    this.cartService.cartUpdates$.subscribe((result) => {
      console.log('CartService event called', result);
    });

  }

  ngOnInit(): void {
    this._authService.isAuthenticated()
      .then((userAuthenticated: boolean) => {
        this.userAuthenticated = userAuthenticated;
        console.log("ngOnInit() then userAuthenticated:",this.userAuthenticated);
      });
  }

  login(){
    this._authService.login();
  }

  logout(){
    this._authService.logout();
  }

  openDialog() {
    const dialogRef = this.dialog.open(CartDialogComponent, {
      width: '400px',
      data: { name: 'Usman', animal: 'IDK' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
      // this.animal = result;
    });
  }

}

export const DOTNET_BASE_API: string = Constants.apiRoot;
