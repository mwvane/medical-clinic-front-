import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Result } from '../models/result';
import { Email } from './models/email';
import { EmailConfirm } from './models/emailConfirm';
import { UserRole } from '../user/userRole';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = 'https://localhost:7137/api/Auth/';
  get loggedUser() {
    return this.decodeToken();
  }

  constructor(private http: HttpClient) {}

  register(form: any) {
    form.value.identityNumber = String(form.value.identityNumber);
    form.value.id = 0;
    if (!form.value.role) {
      form.value.role = UserRole.client;
    }
    return this.http.post<Result>(`${this.baseUrl}register`, form.value);
  }

  login(user: any) {
    return this.http.post<Result>(`${this.baseUrl}login`, user);
  }

  twoFactory(status: boolean) {
    return this.http.post<Result>(`${this.baseUrl}twoFactory`, status);
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

  changePassword(email: string, password: string, confirmPassword: string) {
    return this.http.post<Result>(`${this.baseUrl}changePassword`, {
      email,
      password,
      confirmPassword,
    });
  }

  decodeToken() {
    const jwtHelper = new JwtHelperService();
    const token: any = this.getToken();
    if (token !== 'null') {
      return jwtHelper.decodeToken(token);
    }
  }
}
