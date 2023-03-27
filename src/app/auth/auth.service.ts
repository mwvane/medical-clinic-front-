import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Form } from '@angular/forms';
import { Result } from '../models/result';
import { Email } from './models/email';
import { User } from './models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = 'https://localhost:7137/api/Auth/';

  constructor(private http: HttpClient) {}
  register(form: any) {
    let user: User = {
      email: form.value.email,
      firstname: form.value.firstname,
      lastname: form.value.lastname,
      identityNumber: form.value.ID,
      password: form.value.password,
    };
    return this.http.post<Result>(`${this.baseUrl}register`, user);
  }

  login(form: any) {
    const user = {
      username: form.value.username,
      password: form.value.password,
    };
    return this.http.post<Result>(`${this.baseUrl}login`,user)
  }

  sendEmail(emailTo: string){
    debugger
    const email:Email = {emailFrom: "bzishvili57@gmail.com", emailTo: [emailTo]}
    return this.http.post(`${this.baseUrl}sendMail`,email)
  }
}
