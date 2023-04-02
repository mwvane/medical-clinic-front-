export class DateHelper {
  private static weekDays: any = [
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

  public static restDayes: string[] = [
    "შაბათი",
    "კვირა"
  ]

  public static isRestDay(day:string){
    let isRest = false
    for(let item of this.restDayes){
      if(day === item){
        isRest = true
      }
    }
    return isRest
  }

  
  public static getMonth(monthNumber: number) {
    return this.monthes[monthNumber];
  }

  public static getWeekDay(day: number) {
    return this.weekDays[day];
  }

  public static getDayAfter(day: number){
    let date = new Date();
    date.setDate(date.getDate() + day);
    return date
  }
}
