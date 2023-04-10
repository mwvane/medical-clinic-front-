import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Day } from '../models/day';
import { DayStatus } from '../dayStatus';
import { DateHelper } from 'src/app/DateHelper';
import { UserRole } from 'src/app/user/userRole';

@Component({
  selector: 'app-calendar-item',
  templateUrl: './calendar-item.component.html',
  styleUrls: ['./calendar-item.component.css'],
})
export class CalendarItemComponent {
  @Input() loggedUserRole = UserRole.client;
  @Input() day: any = {
    date: new Date(),
    isBooked: false,
    isRestDay: false,
  };

  tooltipDelay: number = 1000;

  @Output() onDay = new EventEmitter();
  @Output() removeBook = new EventEmitter();

  onDayClick(day: Day) {
    if (
      !(this.day.isBooked || this.day.isRestDay) &&
      this.day.date > new Date()
    ) {
      const hour = this.day.date.getHours();
      this.onDay.emit(this.day);
    }
  }

  get isRestDay() {
    return DateHelper.isRestDay(this.day.date);
  }

  get getDetails() {
    return `დღე: ${DateHelper.getWeekDay(this.day.date)},
     თარიღი: ${this.day.date.getDate()} ${DateHelper.getMonth(
      this.day.date.getMonth()
    )},\n საათი: ${this.day.date.getHours()}სთ`;
  }

  get getStatus() {
    if (this.day.bookId) {
      if (this.day.isCurrentUserBook) {
        return DayStatus.currentUserBook;
      }
      return DayStatus.booked;
    }
    if (this.day.isRestDay) {
      return DayStatus.restDay;
    }
    return DayStatus.free;
  }

  onBookRemove(e: any) {
    e.stopPropagation();
    this.removeBook.emit(this.day.bookId);
  }
}
