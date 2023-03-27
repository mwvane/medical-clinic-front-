import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { Category } from '../models/category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];
  isLoading: boolean = true;
  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.categoryService.getCategories().subscribe((data) => {
      this.isLoading = false;
      if (data.res) {
        this.categories = data.res;
      }
    });
  }

  onOpen(category: Category) {
    for (let item of this.categories) {
      if (item.id !== category.id) {
        item.isSelected = false;
      }
    }
  }
}
