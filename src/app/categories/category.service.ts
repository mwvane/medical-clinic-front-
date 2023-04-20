import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Result } from '../models/result';
import { Category } from './models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private baseUrl: string = 'https://localhost:7137/api/category/';

  constructor(private http: HttpClient) {}

  getCategories(){
    return this.http.get<Result>(`${this.baseUrl}getCategories`)
  }

  deleteCategory(id: number){
    return this.http.post<Result>(`${this.baseUrl}delete`,id)
  }

  addCategory(category: Category){
    return this.http.post<Result>(`${this.baseUrl}add`,category)
  }

  updateCategory(category: Category){
    return this.http.post<Result>(`${this.baseUrl}update`,category)
  }
}
