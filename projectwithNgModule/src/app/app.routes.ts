import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductFormComponent } from './components/product-form/product-form.component';

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
  // {
  //   path:"**",
  //   redirectTo:"categories"
  // }
];
