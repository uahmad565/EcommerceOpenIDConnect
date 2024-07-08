import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DOTNET_BASE_API } from '../app.component';
import { Product } from '../components/products/products.component';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor(private http: HttpClient, private authService: AuthService) {

  }

  getProductByCategory(category: string) {
    return Promise.resolve(
      fetch(
        DOTNET_BASE_API + '/api/products/GetProducts' + '?category=' + category,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${this.authService._user?.access_token}`,
            'Content-Type': 'application/json'
          }
        }
      )
    );
  }

  getProductById(id: String): Observable<Product> {
    return this.http.get<Product>(DOTNET_BASE_API + '/api/products/' + id, { headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService._user?.access_token}`) });
  }

  postProduct(formData: Product) {
    return this.http.post(DOTNET_BASE_API + '/api/products', formData, { headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService._user?.access_token}`) });
  }

  putProduct(id: String, formData: Product) {
    return this.http.put(DOTNET_BASE_API + '/api/products/' + id, formData);
  }
}
