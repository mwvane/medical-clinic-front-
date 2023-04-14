import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Result } from 'src/app/models/result';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = 'https://localhost:7137/api/User/';
  constructor(private http: HttpClient) {}

  getUser(id: number = 0) {
    return this.http.get<Result>(`${this.baseUrl}getUser?id=${id}`);
  }

  deleteUser(userId: number) {
    return this.http.post<Result>(`${this.baseUrl}deleteUser`, userId);
  }

  editUser(user:User){
    return this.http.post<Result>(`${this.baseUrl}editUser`, user)
  }
}
