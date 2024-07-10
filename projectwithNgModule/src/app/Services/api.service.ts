import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, switchMap } from 'rxjs';
import { DOTNET_BASE_API } from '../app.component';
import { Product } from '../components/products/products.component';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor(private http: HttpClient) {

  }

  getProductByCategory(category: string) {
    return this.http.get<Product>(`${DOTNET_BASE_API}/api/products/GetProducts?category=${category}`);
  }

  getProductById(id: String): Observable<Product> {
    return this.http.get<Product>(`${DOTNET_BASE_API}/api/products/${id}`);
  }

  postProduct(formData: Product) {
    return this.http.post(DOTNET_BASE_API + '/api/products', formData);
  }

  putProduct(id: String, formData: Product) {
    return this.http.put(DOTNET_BASE_API + '/api/products/' + id, formData);
  }

  //privacy Claims API
  getUserClaims(){
    return this.http.get<any>(`${DOTNET_BASE_API}/api/claims/Privacy`);
  }
}
