import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CardComponent } from './components/card/card.component';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './components/products/products.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartService } from './Services/cart.service';
import { CartDialogComponent } from './components/cart-dialog/cart-dialog.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MaterialModule } from './material-module';
import { SigninRedirectCallbackComponent } from './signin-redirect-callback/signin-redirect-callback.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SignoutRedirectCallbackComponent } from './signout-redirect-callback/signout-redirect-callback.component';
import { HomeComponent } from './home/home.component';
import { AuthInterceptorService } from './Services/auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CardComponent,
    ProductsComponent,
    ProductFormComponent,
    CartDialogComponent,
    SigninRedirectCallbackComponent,
    NotFoundComponent,
    SignoutRedirectCallbackComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule, //<router-outlet/>
    AppRoutingModule, //custom routes
    HttpClientModule, //http requests
    ReactiveFormsModule, //FormGroup
    FormsModule, //ngModel two way binding
    MaterialModule,
  ],
  providers: [provideClientHydration(), provideAnimationsAsync(), 
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
