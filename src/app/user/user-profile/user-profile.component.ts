import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { CalendarMode } from 'src/app/calendar-component/calendarMode';
import { Book } from 'src/app/models/book';
import { UserRole } from '../userRole';
import { ActivatedRoute} from '@angular/router';
import { DoctorService } from '../services/doctor.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  user: any;
  currentUserBookDays: Book[] = [];
  calendarMode = CalendarMode.clientMode;

  constructor(
      private route: ActivatedRoute,
    private doctorService: DoctorService,
    private UserService: UserService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      const role = params['role'];
      if (id) {
        if (role === UserRole.client) {
          this.UserService.getUser(id).subscribe((data) => {
            if (data.res) {
              this.user = data.res;
            }
          });
        } else {
          this.doctorService.getDoctors(id).subscribe((data) => {
            if (data.res) {
              this.user = data.res;
            }
          });
        }
      }
      if (role === UserRole.client || role === UserRole.admin) {
        this.calendarMode = CalendarMode.clientMode;
      }
      if (role === UserRole.doctor) {
        this.calendarMode = CalendarMode.doctorMode;
      }
    });
  }

  get calendarmode(){
    if(this.user.role === UserRole.client){
      return CalendarMode.clientMode
    }
    if(this.user.role === UserRole.doctor){
      return CalendarMode.doctorMode
    }
    return CalendarMode.default
  }
}
