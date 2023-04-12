import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Doctor } from '../user/models/doctor';
import { DoctorService } from '../user/services/doctor.service';
import { Category } from '../categories/models/category';
import { CalendarMode } from '../calendar-component/calendarMode';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private router: Router, private doctorService: DoctorService) {}

  doctors: Doctor[] = [];
  filteredDoctors: Doctor[] = []

  ngOnInit(): void {
    this.doctorService.getDoctors(0).subscribe({
      next: data => {
        if(data.res){
          this.doctors = data.res
          this.filteredDoctors = this.doctors
        }
      },
      error: error => {
        console.log(error)
      }
    });
  }

  onBooking(user: any) {
    this.router.navigate(["booking/", user.id]);
    this.doctorService.increaseDeoctorView(user.id).subscribe((data) => {
      if (data.res) {
      } else {
      }
    });
  }

  onPin(pinStatus: boolean) {
    console.log(pinStatus);
  }

  onCategorySelect(category: Category){
    this.filteredDoctors = this.doctors.filter(doctor => doctor.category.id === category.id)
  }
}
