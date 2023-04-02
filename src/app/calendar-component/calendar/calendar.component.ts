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
  hours = [9,10,11,12,13,14,15,16,17,18];
  ngOnInit(): void {
    for (let i = 1; i <= 7; i++) {
      const day = DateHelper.getDayAfter(i);
      let formatedDay: Day = {
        index: 0,
        number: day.getDate(),
        weekDay: DateHelper.getWeekDay(day.getDay()),
        month: DateHelper.getMonth(day.getMonth()),
        isRestDay: DateHelper.isRestDay(DateHelper.getWeekDay(day.getDay()))
      };
      this.daysDisplayed.push(formatedDay);
    }
    console.log(this.daysDisplayed);
  }

  get currentMonth(){
    const month = this.daysDisplayed[0].month
    return month
  }

  updateDayPage() {
    this.daysDisplayed = [];
    for (let i = 1; i <= 7; i++) {
      const day = DateHelper.getDayAfter(i + this.dayPageCounter * 7);
      let formatedDay: Day = {
        index: i,
        number: day.getDate(),
        weekDay: DateHelper.getWeekDay(day.getDay()),
        month: DateHelper.getMonth(day.getMonth()),
        isRestDay: DateHelper.isRestDay(DateHelper.getWeekDay(day.getDay()))
      };
      this.daysDisplayed.push(formatedDay);
    }
  }
  

  ondaysNextPage() {
    this.dayPageCounter++;
    this.updateDayPage();
  }

  ondaysPreviousPage() {
    this.dayPageCounter--;
    this.updateDayPage();
  }

  onDay(day: Day) {
    console.log(day);
  }
}
