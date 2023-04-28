import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DateHelper } from 'src/app/DateHelper';
import { Day } from '../models/day';
import { BookService } from 'src/app/services/book.service';
import * as moment from 'moment';
import { Book } from 'src/app/models/book';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { CalendarMode } from '../calendarMode';
import { UserRole } from 'src/app/user/userRole';
import { AuthService } from 'src/app/auth/auth.service';
import { ModalService } from 'src/app/modals/modal.service';
import { UserService } from 'src/app/user/services/user.service';
import { Doctor } from 'src/app/user/models/doctor';
import { DoctorService } from 'src/app/user/services/doctor.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers: [ConfirmationService, MessageService],
})
export class CalendarComponent implements OnInit {
  calendarItems: Day[][] = [];
  dayPageCounter = 0;
  hours = DateHelper.hours;
  weekDays = DateHelper.weekDays;
  bookedDays: Book[] = [];
  bookModal = false;
  description: string = '';
  selectedDay: any;
  searchData: any[] = [];
  @Input() calendarMode: CalendarMode = CalendarMode.default;
  @Input() CalendarUser: any;
  @Input() doctorId: any;
  @Input() doctor: any;
  @Input() user: any;

  constructor(
    private bookService: BookService,
    private dialog: ConfirmationService,
    private authService: AuthService,
    private modalService: ModalService,
    private userService: UserService,
    private doctorService: DoctorService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getBookedDays();
    this.getCurrentPageDays();
    debugger;
    if (this.CalendarUser.role === UserRole.doctor) {
      this.doctor = this.CalendarUser;
      if (!this.user) {
        this.getUsers();
      }
    }
    if (this.CalendarUser.role === UserRole.client) {
      this.user = this.CalendarUser;
      if (!this.doctor) {
        this.getDoctors();
      }
    }
  }

  get canShowSearcModal() {
    if (this.doctor && this.user) {
      return false;
    }
    return true;
  }

  get canShowDescriptionModal() {
    return true;
    if (this.selectedDay && this.selectedDay.isCurentUserBook) {
      return true;
    }
    return this.doctor && this.user;
  }

  getUsers() {
    this.userService.getUsersByRole(UserRole.client).subscribe((data) => {
      if (data.res) {
        this.searchData = data.res;
      }
    });
  }
  getDoctors() {
    this.doctorService.getDoctors(0).subscribe((data) => {
      if (data.res) {
        this.searchData = data.res;
      }
    });
  }

  onUserSelect(user: any) {
    this.modalService.usersModal = false;
    if (user.role === UserRole.client) {
      this.user = user;
    }
    if (user.role === UserRole.doctor) {
      this.doctor = user;
    }
    this.bookModal = true
  }

  getCurrentPageDays() {
    this.calendarItems = [];
    let starterDay = DateHelper.getStarterDay();
    starterDay = DateHelper.addDay(starterDay, 7 * this.dayPageCounter);
    const week = DateHelper.getWeek(starterDay);
    for (let hour of this.hours) {
      let items: Day[] = [];
      for (let day of week) {
        const newDay = { ...day };
        newDay.isRestDay = DateHelper.isRestDay(day.date);
        newDay.date = this.getDayCopy(day.date, hour);
        newDay.book = this.getBook(newDay)!;
        items.push(newDay);
      }
      this.calendarItems.push(items);
    }
  }

  getBook(day: Day): Book | null {
    for (let item of this.bookedDays) {
      if (moment(item.date).format() == moment(day.date).format()) return item;
    }
    return null;
  }

  isCurentUserBook(day: Day, book: any): boolean {
    debugger;
    if (day.book && this.CalendarUser) {
      if (this.user.id == book.userId) {
        return true;
      }
    }
    return false;
  }

  getBookedDays() {
    if (this.calendarMode === CalendarMode.clientMode) {
      this.bookService
        .getClientBookedDays(this.CalendarUser.id)
        .subscribe((data) => {
          if (data.res) {
            this.bookedDays = data.res;
            this.setDayBookedStatus();
          }
        });
    }
    if (this.calendarMode === CalendarMode.default) {
      this.bookService.getDoctorBookedDays(this.doctorId).subscribe((data) => {
        if (data.res) {
          this.bookedDays = data.res;
          this.setDayBookedStatus();
        } else {
          console.log(data.errors);
        }
      });
    }

    if (this.calendarMode === CalendarMode.doctorMode) {
      this.bookService
        .getDoctorBookedDays(this.CalendarUser.id)
        .subscribe((data) => {
          if (data.res) {
            this.bookedDays = data.res;
            this.setDayBookedStatus();
          } else {
            console.log(data.errors);
          }
        });
    }
  }

  setDayBookedStatus() {
    if (this.bookedDays) {
      for (let item of this.calendarItems) {
        for (let day of item) {
          for (let bookedDay of this.bookedDays) {
            if (moment(bookedDay.date).format() == moment(day.date).format()) {
              debugger;
              day.book = bookedDay;
              day.isCurrentUserBook =
                this.calendarMode === CalendarMode.doctorMode
                  ? true
                  : this.isCurentUserBook(day, bookedDay);
            }
          }
        }
      }
    }
  }

  get currentMonth() {
    const monthInNumber = this.calendarItems[0][0].date.getMonth();
    const monthInString = DateHelper.getMonth(monthInNumber);
    return monthInString;
  }

  get currentWeekDays() {
    let days: Day[] = [];
    for (let day of this.calendarItems[0]) {
      days.push(day);
    }
    return days;
  }

  increaseMonth() {
    let date = new Date();
    date.setDate(1);
    date.setMonth(this.currentWeekDays[0].date.getMonth() + 1);
    if (date) {
      const starterDay = DateHelper.getStarterDay(date);
    }
  }

  decreaseMonth() {
    let date = this.currentWeekDays[0].date;
    if (date) {
      date.setMonth(date.getMonth() - 1);
    }
  }

  ondaysNextPage() {
    this.dayPageCounter++;
    this.getCurrentPageDays();
    this.setDayBookedStatus();
  }

  ondaysPreviousPage() {
    this.dayPageCounter--;
    this.getCurrentPageDays();
    this.setDayBookedStatus();
  }

  onDay(day: Day) {
    if (this.authService.loggedUser) {
      if (!day.book) {
        this.modalService.usersModal = true;
      }
      if (this.CalendarUser) {
        this.description = '';
        this.selectedDay = day;
        if (this.user && this.doctor) {
          this.bookModal = true;
        }
        if (day.isCurrentUserBook) {
          this.description = day.book!.description!;
          this.bookModal = true;
        }
      }
    } else {
      this.modalService.loginModal = true;
    }
  }

  getDayCopy(date: Date, hour: number) {
    const newDate = new Date();
    newDate.setTime(date.getTime());
    newDate.setHours(hour, 0, 0, 0);
    return newDate;
  }

  onRemoveBook(day: Day) {
    this.dialog.confirm({
      message: 'ნამდვილად გსურთ ჯავშნის გაუქმება?',
      header: 'Remove book',
      icon: 'pi pi-question',
      accept: () => {
        if (day.book) {
          this.bookService.removeBook(day.book.id!).subscribe((data) => {
            if (data.res) {
              day.book = null;
              day.isCurrentUserBook = false;
            }
          });
        }
      },
    });
  }

  onBookDialogClose() {
    this.bookModal = false;
  }

  onBookModalConfirm() {
    const book: Book = {
      date: this.selectedDay.date,
      description: this.description,
      doctorId: this.doctor.id,
      userId: this.user.id,
    };
    this.selectedDay.book = book;
    this.selectedDay.isCurentUserBook = true;
    this.bookService.addBook(book).subscribe((data) => {
      if (data.res) {
        this.messageService.add({
          severity: 'success',
          summary: 'Booking',
          detail: `თქვენ წარმატებით დაჯავშნეთ ვიზიტი ${this.doctor.firstname} ${this.doctor.lastname}-სთან`,
          life: 3000,
        });
      } else {
        alert(data.errors);
      }
    });
    this.onBookDialogClose();
  }

  onBookUpdate() {
    this.selectedDay.book.description = this.description;
    this.bookService.updateBook(this.selectedDay.book).subscribe((data) => {
      if (data.res) {
        alert('updated');
      }
    });
    this.onBookDialogClose();
  }
}
