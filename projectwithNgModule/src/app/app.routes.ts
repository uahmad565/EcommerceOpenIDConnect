import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { SigninRedirectCallbackComponent } from './signin-redirect-callback/signin-redirect-callback.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SignoutRedirectCallbackComponent } from './signout-redirect-callback/signout-redirect-callback.component';
import { HomeComponent } from './home/home.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';

export const routes: Routes = [
  {
    path: 'categories',
    component: DashboardComponent,
  },
  {
    path: 'categories/:categoryType',
    component: ProductsComponent,
  },
  {
    path: 'create',
    component: ProductFormComponent,
  },
  {
    path: 'edit/:id',
    component: ProductFormComponent,
  },
  {
    path: 'privacy',
    component: PrivacyComponent
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: '404',
    component: NotFoundComponent,
  },
  {
    path: 'signin-callback',
    component: SigninRedirectCallbackComponent
  },
  {
    path: 'signout-callback',
    component: SignoutRedirectCallbackComponent
  },
  {
    path: "**",
    redirectTo: "/404",

  }
];
