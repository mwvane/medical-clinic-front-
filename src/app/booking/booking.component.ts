import { Component, OnInit } from '@angular/core';
import { Doctor } from '../user/models/doctor';
import { ActivatedRoute, Route } from '@angular/router';
import { DoctorService } from '../user/services/doctor.service';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { CalendarMode } from '../calendar-component/calendarMode';
import { User } from '../user/models/user';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
  providers: [MessageService],
})
export class BookingComponent implements OnInit {
  doctor: Doctor = {
    id: 6,
    firstname: 'ანა',
    lastname: 'დვალი',
    role: 'doctor',
    bookCount: 501,
    email: 'doctor@gmail.com',
    image: '',
    rating: 5,
    isPinned: false,
    category: { name: '' },
    views: 333,
  };
  user: any

  calendarMode = CalendarMode.default;

  constructor(
    private route: ActivatedRoute,
    private docotorService: DoctorService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.docotorService.getDoctors(id).subscribe((data) => {
          if (data.res) {
            this.doctor = data.res;
          }
        });
      }
    });
    this.user = this.authService.loggedUser
  }

  get doctorId() {
    return new Observable<number>((observer) => {
      this.route.params.subscribe((params) => {
        const id = params['id'];
        observer.next(id);
      });
    });
  }
}
