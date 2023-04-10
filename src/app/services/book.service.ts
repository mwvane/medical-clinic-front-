import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../models/book';
import { Result } from '../models/result';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  baseUrl: string = 'https://localhost:7137/api/Book/';

  constructor(private http: HttpClient) {}

  getBookedDays(doctorId: number) {
    return this.http.get<Result>(`${this.baseUrl}getBookedDays?id=${doctorId}`);
  }

  addBook(book: Book) {
    return this.http.post<Result>(`${this.baseUrl}addBook`, book);
  }

  updateBook(book:Book){
    return this.http.post<Result>(`${this.baseUrl}updateBook`, book);
  }

  removeBook(bookId: number){
    return this.http.post<Result>(`${this.baseUrl}removeBook`, bookId);
  }
}
