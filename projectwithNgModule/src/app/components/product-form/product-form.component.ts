import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DOTNET_BASE_API } from '../../app.component';
import { ApiService } from '../../Services/api.service';
import { Product } from '../products/products.component';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
})
export class ProductFormComponent implements OnInit {
  myForm: FormGroup = new FormGroup({});
  errorMessage: String = '';
  isCreateForm: boolean = true;
  editProductId: String = '';
  listCategories = [
    'Sports',
    'Electronics',
    'Home Devices',
    'PCs',
    'Laptops',
    'Tablets',
    'Books',
  ];
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router, //for navigation, router link
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {
    let product: Product = {
      productId: 0,
      name: '',
      description: '',
      categoryName: '',
      price: 0,
    };
    this.createForm(product);
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.editProductId = id;
      console.log('query paramters', params, id);
      if (id) {
        this.isCreateForm = false;
        this.apiService.getProductById(id).subscribe(
          (data: Product) => {
            console.log(data);
            this.createForm(data);
          },
          (error) => {
            console.log(error);
          }
        );
      }
    });
  }

  createForm(product: Product) {
    this.myForm = this.formBuilder.group({
      name: [product.name, Validators.required],
      description: [
        product.description,
        [Validators.required, Validators.min(5)],
      ],
      price: [product.price, [Validators.required]],
      categoryName: [product.categoryName, [Validators.required]],
    });
  }

  onSubmit() {
    console.log(this.myForm);
    const formData: Product = this.myForm.value;
    if (this.isCreateForm) {
      this.apiService.postProduct(formData).subscribe(
        (response) => {
          // Handle success response from server
          console.log('Form submitted successfully:', response);
          this.router.navigate(['/categories']); // Redirect to success page
        },
        (error) => {
          // Handle API call errors
          console.error('Error submitting form:', error);
          this.errorMessage = error.message;
          // Display error message to user (optional)
        }
      );
    } else {
      this.apiService.putProduct(this.editProductId, formData).subscribe(
        (response) => {
          // Handle success response from server
          console.log('Form submitted successfully:', response);
          this.router.navigate(['/categories']); // Redirect to success page
        },
        (error) => {
          // Handle API call errors
          console.error('Error submitting form:', error);
          this.errorMessage = error.message;
          // Display error message to user (optional)
        }
      );
    }

    console.log(this.myForm.invalid);
  }
}
