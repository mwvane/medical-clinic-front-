import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  baseUrl:string = "https://localhost:7137/api/Book"

  constructor(private http: HttpClient) { }

  addBook(){
    
  }
}
