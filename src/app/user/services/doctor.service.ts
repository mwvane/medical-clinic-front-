import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Result } from 'src/app/models/result';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private baseUrl = "https://localhost:7137/api/Doctor/"
  constructor(private http: HttpClient) {}

  getDoctors(id?:number| null){
    return this.http.get<Result>(`${this.baseUrl}getDoctors?id=${id}`)
  }

  increaseDeoctorView(doctorId:number){
    return this.http.post<Result>(`${this.baseUrl}increaseDoctorViews`,doctorId)
  }
}
