import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from '../components/products/products.component';

export interface CartProduct {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartUpdates = new Subject<CartProduct[]>();
  public cartUpdates$ = this.cartUpdates.asObservable();

  public cartItems: CartProduct[] = [];

  public get count(): number {
    return this.cartItems.reduce((c, t1) => t1.quantity + c, 0);
  }

  constructor() {}

  add(product: Product) {
    let item: CartProduct = this.cartItems.find(
      (item) => item.product.productId == product.productId
    ) as CartProduct;

    if (item) {
      item.quantity++;
    } else {
      this.cartItems.push({ product, quantity: 1 } as CartProduct);
    }

    this.cartUpdates.next(this.cartItems);
    //test
  }
}
