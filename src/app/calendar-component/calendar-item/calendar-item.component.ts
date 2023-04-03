import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Day } from '../models/day';
import { DayStatus } from '../dayStatus';
import { DateHelper } from 'src/app/DateHelper';

@Component({
  selector: 'app-calendar-item',
  templateUrl: './calendar-item.component.html',
  styleUrls: ['./calendar-item.component.css'],
})
export class CalendarItemComponent {
  @Input() hour: number = 0;
  @Input() day: Day = {
    date: new Date(),
    isBooked: false,
    isRestDay: false,
  };

  tooltipDelay:number = 1000

  @Output() onDay = new EventEmitter();

  onDayClick() {
    this.day.date.setHours(this.hour, 0, 0);
    if (
      !(this.day.isBooked || this.day.isRestDay) &&
      this.day.date > new Date()
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
    )} საათი: ${this.hour}სთ`;
  }

  get getStatus() {
    if (this.day.isBooked) {
      return DayStatus.booked;
    }
    if (this.day.isRestDay) {
      return DayStatus.restDay;
    }
    return DayStatus.free;
  }
}
