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

  getDoctorBookedDays(doctorId: number) {
    return this.http.get<Result>(`${this.baseUrl}getDoctorBookedDays?id=${doctorId}`);
  }

  getClientBookedDays(userId: number) {
    return this.http.get<Result>(`${this.baseUrl}getClientBookedDays?id=${userId}`);
  }

  addBook(book: Book) {
    return this.http.post<Result>(`${this.baseUrl}addBook`, book);
  }

  updateBook(book: Book) {
    return this.http.post<Result>(`${this.baseUrl}updateBook`, book);
  }

  removeBook(bookId: number) {
    return this.http.post<Result>(`${this.baseUrl}removeBook`, bookId);
  }
}
