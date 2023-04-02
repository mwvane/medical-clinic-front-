import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Result } from '../models/result';
import { Email } from './models/email';
import { EmailConfirm } from './models/emailConfirm';
import { User } from './models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = 'https://localhost:7137/api/Auth/';
  get loggedUser(){
    return this.decodeToken()
  };

  constructor(private http: HttpClient) {}

  register(form: any) {
    let user: User = {
      email: form.value.email,
      firstname: form.value.firstname,
      lastname: form.value.lastname,
      identityNumber: String(form.value.ID),
      password: form.value.password,
      role: "doctor"
    };
    return this.http.post<Result>(`${this.baseUrl}register`, user);
  }

  login(user: any) {
    debugger
    return this.http.post<Result>(`${this.baseUrl}login`, user);
  }

  sendEmail(emailTo: string) {
    debugger;
    const email: Email = {
      emailFrom: 'bzishvili57@gmail.com',
      emailTo: [emailTo],
    };
    return this.http.post(`${this.baseUrl}sendMail`, email);
  }
  confirmEmail(emailAndCode: EmailConfirm) {
    return this.http.post<Result>(`${this.baseUrl}emailConfirm`, emailAndCode);
  }

  storeToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logOut() {
    if (this.isLoggedIn()) {
      localStorage.removeItem('token');
    }
  }

  decodeToken() {
    const jwtHelper = new JwtHelperService();
    const token: any = this.getToken();
    if(token !== 'null'){
      return jwtHelper.decodeToken(token);
    }
  }
}
