import { Component, OnInit } from '@angular/core';
import { DateHelper } from 'src/app/DateHelper';
import { Helper } from 'src/app/helper';
import { Day } from '../models/day';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  daysDisplayed: Day[] = [];
  dayPageCounter = 0;
  hours = DateHelper.hours;
  weekDays = DateHelper.weekDays;

  ngOnInit(): void {
    const starterDay = DateHelper.getStarterDay();
    this.daysDisplayed = DateHelper.getWeek(starterDay);
  }

  get currentMonth() {
    const monthInNumber = this.daysDisplayed[0].date.getMonth();
    const monthInString = DateHelper.getMonth(monthInNumber);
    return monthInString;
  }

  increaseMonth() {
    debugger
    let date = new Date();
    date.setDate(1)
    date.setMonth(this.daysDisplayed[0].date.getMonth() + 1 )
    if (date) {
      const starterDay = DateHelper.getStarterDay(date);
      this.daysDisplayed = DateHelper.getWeek(starterDay);
    }
  }
  decreaseMonth() {
    let date = this.daysDisplayed[0].date;
    if (date) {
      date.setMonth(date.getMonth() - 1);
    }
  }

  ondaysNextPage() {
    this.daysDisplayed = DateHelper.getWeek(
      DateHelper.addDay(
        this.daysDisplayed[this.daysDisplayed.length - 1].date,
        1
      )
    );
  }

  ondaysPreviousPage() {
    this.daysDisplayed = DateHelper.getWeek(
      DateHelper.addDay(this.daysDisplayed[0].date, -7)
    );
  }

  onDay(day: Day) {
    console.log(day);
  }
}
