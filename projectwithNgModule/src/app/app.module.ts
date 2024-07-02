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
import { HttpClientModule } from '@angular/common/http';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartService } from './Services/cart.service';
import { CartDialogComponent } from './components/cart-dialog/cart-dialog.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MaterialModule } from './material-module';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CardComponent,
    ProductsComponent,
    ProductFormComponent,
    CartDialogComponent,
  ],
  imports: [
    BrowserModule, //<router-outlet/>
    AppRoutingModule, //custom routes
    HttpClientModule, //http requests
    ReactiveFormsModule, //FormGroup
    FormsModule, //ngModel two way binding
    MaterialModule,
  ],
  providers: [provideClientHydration(), provideAnimationsAsync(), CartService],
  bootstrap: [AppComponent],
})
export class AppModule {}
