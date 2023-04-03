import { CalendarConstants } from './calendar-component/constants';
import { Day } from './calendar-component/models/day';

export class DateHelper {
  public static weekDays: any = [
    'კვირა',
    'ორშაბათი',
    'სამშაბათი',
    'ოთხშაბათი',
    'ხუთშაბათი',
    'პარასკევი',
    'შაბათი',
  ];
  private static monthes: any = [
    'იანვარი',
    'თებერვალი',
    'მარტი',
    'აპრილი',
    'მაისი',
    'ივნისი',
    'ივლისი',
    'აგვისტო',
    'სექტემბერი',
    'ოქტომბერი',
    'ნოემბერი',
    'დეკემბერი',
  ];

  public static restDayes: string[] = ['შაბათი', 'კვირა'];
  public static hours = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

  public static isRestDay(date: Date) {
    let isRest = false;
    for (let item of this.restDayes) {
      if (this.getWeekDay(date) === item) {
        isRest = true;
      }
    }
    return isRest;
  }

  public static getMonth(monthNumber: number) {
    return this.monthes[monthNumber];
  }

  public static getWeekDay(date: Date) {
    return this.weekDays[date.getDay()];
  }

  public static getDayAfter(day: number) {
    let date: Date = this.getStarterDay();
    date.setDate(date.getDate() + day);
    return date;
  }

  public static addDay(dayFrom: Date, dayCount: number) {
    let date = new Date(dayFrom.getTime());
    date.setDate(dayFrom.getDate() + dayCount);
    return date;
  }

  public static getWeek(dayFrom: Date = new Date()) {
    let weekDays: Day[] = [];
    for (let i = 0; i < 7; i++) {
      let nextDay = new Date(dayFrom.getTime());
      nextDay.setDate(dayFrom.getDate() + i);
      let day: Day = {
        date: nextDay,
      };
      day.isRestDay = DateHelper.isRestDay(day.date);
      weekDays.push(day);
    }
    return weekDays;
  }

  public static getStarterDay(date: Date = new Date()): Date {
    debugger
    let number =
      date.getDate() - (date.getDay() - CalendarConstants.STARTER_DAY);
    // if (number < 0) {
    //   number = number * -1;
    // }
    date.setDate(number);
    return date;
  }
}
