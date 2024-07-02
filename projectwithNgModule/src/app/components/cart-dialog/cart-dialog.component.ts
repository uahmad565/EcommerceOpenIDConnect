import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CartService } from '../../Services/cart.service';

@Component({
  selector: 'app-cart-dialog',
  templateUrl: './cart-dialog.component.html',
  styleUrl: './cart-dialog.component.scss',
})
export class CartDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CartDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public cartService: CartService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onCheckoutClick() {
    this.dialogRef.close({ checkout: true, message: 'Order has been placed ' });
  }
}
