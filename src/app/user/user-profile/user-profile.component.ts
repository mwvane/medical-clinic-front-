import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { CalendarMode } from 'src/app/calendar-component/calendarMode';
import { Book } from 'src/app/models/book';
import { UserRole } from '../userRole';
import { ActivatedRoute } from '@angular/router';
import { DoctorService } from '../services/doctor.service';
import { UserService } from '../services/user.service';
import { ModalService } from 'src/app/modals/modal.service';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  currentUser: any;
  currentUserBookDays: Book[] = [];
  calendarMode = CalendarMode.clientMode;

  constructor(
    private route: ActivatedRoute,
    private doctorService: DoctorService,
    private UserService: UserService,
    private authService: AuthService,
    private modalService: ModalService,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      let role = params['role']
        ? params['role']
        : this.authService.loggedUser.role;
      if (id) {
        if (role === UserRole.client) {
          this.UserService.getUser(id).subscribe((data) => {
            if (data.res) {
              this.currentUser = data.res;
            }
          });
        } else {
          this.doctorService.getDoctors(id).subscribe((data) => {
            if (data.res) {
              this.currentUser = data.res;
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

  get calendarmode() {
    if (this.currentUser.role === UserRole.client) {
      return CalendarMode.clientMode;
    }
    if (this.currentUser.role === UserRole.doctor) {
      return CalendarMode.doctorMode;
    }
    return CalendarMode.default;
  }

  onForgetPassword() {
    this.modalService.forgetPasswordModal = true;
  }
}
