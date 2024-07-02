import { Component, OnInit } from '@angular/core';
import { CategoriesService, Category } from './categories.service';
import { CardComponent } from '../components/card/card.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit{
  categories:Category[]=[];

  constructor(public categoryService: CategoriesService) {}
  
  ngOnInit(): void {
    console.log(this.categoryService);
    this.categories=this.categoryService.categories;
  }

  onCardClick(category:Category)
  {
    console.log("click ",category);
  }
  
}
