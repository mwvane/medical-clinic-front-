import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Day } from '../models/day';
import { DayStatus } from '../dayStatus';

@Component({
  selector: 'app-calendar-item',
  templateUrl: './calendar-item.component.html',
  styleUrls: ['./calendar-item.component.css'],
})
export class CalendarItemComponent {
  @Input() hour: number = 0;
  @Input() day: Day = {
    index: this.setHour,
    number: 0,
    weekDay: '',
    month: '',
    isBooked: false,
    isRestDay: false,
  };
  @Output() onDay = new EventEmitter();
  onDayClick() {
    if(!(this.day.isBooked || this.day.isRestDay)){
      this.onDay.emit(this.day);
    }
  }

  get setHour() {
    return this.hour;
  }

  get getStatus() {
    if (this.day.isBooked) {
      return DayStatus.booked;
    }
    if(this.day.isRestDay){
      return DayStatus.restDay
    }
    return DayStatus.free;
  }
}
