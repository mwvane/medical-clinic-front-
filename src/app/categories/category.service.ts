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
}
