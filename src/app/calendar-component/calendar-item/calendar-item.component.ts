import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DayStatus } from '../dayStatus';
import { DateHelper } from 'src/app/DateHelper';
import { UserRole } from 'src/app/user/userRole';
import { Day } from '../models/day';
import { CalendarMode } from '../calendarMode';

@Component({
  selector: 'app-calendar-item',
  templateUrl: './calendar-item.component.html',
  styleUrls: ['./calendar-item.component.css'],
})
export class CalendarItemComponent {
  @Input() calendarMode:string = CalendarMode.default;
  @Input() day: Day = {
    date: new Date(),
    isRestDay: false,
    isCurrentUserBook: false,
  };

  tooltipDelay: number = 1000;

  @Output() onDay = new EventEmitter();
  @Output() removeBook = new EventEmitter();

  onDayClick() {
    if (this.day.isRestDay) {
      return;
    }
    if (
      this.day.isCurrentUserBook ||
      (!this.day.book && this.day.date > new Date())
    ) {
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
    if (this.day.book) {
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
    this.removeBook.emit(this.day);
  }
}
