import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DateHelper } from 'src/app/DateHelper';
import { Day } from '../models/day';
import { BookService } from 'src/app/services/book.service';
import * as moment from 'moment';
import { AuthService } from 'src/app/auth/auth.service';
import { Book } from 'src/app/models/book';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers: [ConfirmationService],
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
  loggedUser: any;

  @Input() doctorId: any;
  @Output() addBook = new EventEmitter();
  @Output() updateBook = new EventEmitter();

  constructor(
    private bookService: BookService,
    private authService: AuthService,
    private dialog: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loggedUser = this.authService.loggedUser;
    this.getBookedDays();
    this.getCurrentPageDays();
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
    if (day.book) {
      if (this.authService.loggedUser.id == book.userId) {
        return true;
      }
    }
    return false;
  }

  getBookedDays() {
    this.bookService.getBookedDays(this.doctorId).subscribe((data) => {
      if (data.res) {
        this.bookedDays = data.res;
        this.setDayBookedStatus();
      } else {
        console.log(data.errors);
      }
    });
  }

  setDayBookedStatus() {
    if (this.bookedDays) {
      for (let item of this.calendarItems) {
        for (let day of item) {
          for (let bookedDay of this.bookedDays) {
            if (moment(bookedDay.date).format() == moment(day.date).format()) {
              day.book = bookedDay;
              day.isCurrentUserBook = this.isCurentUserBook(day, bookedDay);
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
    debugger;
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
    this.description = '';
    this.selectedDay = day;
    if (day.isCurrentUserBook) {
      this.description = day.book!.description!;
    }
    this.bookModal = true;
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
    this.addBook.emit({
      day: this.selectedDay,
      description: this.description,
    });
    this.onBookDialogClose();
  }

  onBookUpdate() {
    this.selectedDay.book.description = this.description;
    this.updateBook.emit(this.selectedDay);
    this.onBookDialogClose();
  }
}
