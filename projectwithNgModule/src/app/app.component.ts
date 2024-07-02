import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CartDialogComponent } from './components/cart-dialog/cart-dialog.component';
import { CartService } from './Services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'projectwithNgModule';
  constructor(public dialog: MatDialog, public cartService: CartService) {
    this.cartService.cartUpdates$.subscribe((result) => {
      console.log('CartService event called', result);
    });
    var products = [
      {
        id: '1',
        name: 'Bedminton',
        categoryId: '6',
      },
      {
        id: '2',
        name: 'Bat',
        categoryId: '7',
      },
    ];
    var categorys = [
      {
        id: '6',
        name: 'Sports',
      },
      {
        id: '7',
        name: 'Sports',
      },
    ];
    var resultArray: any = [];
    products.forEach((product) => {
      var category = categorys.find(
        (category) => category.id == product.categoryId
      );
      resultArray.push(transformToObject(product, category));
    });

    function transformToObject(productParam: any, categoryParam: any) {
      var resultx = {
        name: productParam.name,
        category: {
          xyz: categoryParam.id,
          name: categoryParam.name,
        },
      };
      return resultx;
    }
    console.log(resultArray);
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

export const DOTNET_BASE_API: string = 'https://localhost:7016';
