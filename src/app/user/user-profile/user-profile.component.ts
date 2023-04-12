import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { CalendarMode } from 'src/app/calendar-component/calendarMode';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';
import { UserRole } from '../userRole';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  user: any;
  currentUserBookDays: Book[] = [];
  calendarMode = CalendarMode.clientMode

  constructor(
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.user = this.authService.loggedUser;
    if(this.user.role === UserRole.client){
      this.calendarMode = CalendarMode.clientMode
    }
    if(this.user.role === UserRole.doctor){
      this.calendarMode = CalendarMode.doctorMode
    }
  }
}
