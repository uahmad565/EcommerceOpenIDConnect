import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  categories: Category[] = [
    {
      name: 'Sports',
      link: '/categories/sports',
    },
    {
      name: 'Electronics',
      link: '/categories/electronics',
    },
    {
      name: 'Books',
      link: '/categories/books',
    },
  ];
  constructor() {}
}

export interface Category {
  name: String;
  link: String;
  
}
