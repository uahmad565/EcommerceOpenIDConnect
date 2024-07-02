import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../Services/api.service';
import { CartService } from '../../Services/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  @Input() category: String = '';
  products: Product[] = [];
  subCategories: String[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    public cartService: CartService
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe(
      (params) => {
        console.log(params);

        this.apiService
          .getProductByCategory(params["categoryType"])
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log(data);
            this.products = data.products;
            this.subCategories = data.subCategories;
          })
          .catch((error) => {
            console.log('error occured oho', error);
          });

      },
      (error) => {
        console.log(error);
      }
    );
  }

  routeToEditProduct(product: Product) {
    this.router.navigate([`/edit/${product.productId}`]);
  }

  onAddToCartBtn(event: any, product: Product) {
    event.stopPropagation();
    this.cartService.add(product);
  }
}

export interface Product {
  name: String;
  price: number;
  description: String;
  productId: number;
  categoryName: String;
}
