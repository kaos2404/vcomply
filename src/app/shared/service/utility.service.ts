import { Injectable } from '@angular/core'

import { LocalStorageService } from 'ngx-localstorage'

@Injectable()
export class UtilityService {
  constructor(private localStorage: LocalStorageService) {}

  public setUpLocalStorage() {
    this.localStorage.set(
      'weekly',
      JSON.stringify([
        { name: 'SUNDAY', active: false, id: 0 },
        { name: 'MONDAY', active: false, id: 1 },
        { name: 'TUESDAY', active: false, id: 2 },
        { name: 'WEDNESDAY', active: false, id: 3 },
        { name: 'THURSDAY', active: false, id: 4 },
        { name: 'FRIDAY', active: false, id: 5 },
        { name: 'SATURDAY', active: false, id: 6 }
      ])
    )

    this.localStorage.set('holidays', JSON.stringify([]))
  }

  public getHolidays(): { name: string; date: Date }[] {
    if (!this.localStorage.get('holidays')) {
      this.setUpLocalStorage()
    }

    return JSON.parse(this.localStorage.get('holidays'))
  }

  public getWeekly(): { name: string; active: boolean; id: number }[] {
    if (!this.localStorage.get('weekly')) {
      this.setUpLocalStorage()
    }

    return JSON.parse(this.localStorage.get('weekly'))
  }

  public setHolidays(holidays: { name: string; date: Date }[]) {
    this.localStorage.set('holidays', JSON.stringify(holidays))
  }

  public setWeekly(weekly: { name: string; active: boolean; id: number }[]) {
    this.localStorage.set('weekly', JSON.stringify(weekly))
  }

  public addDay(d: Date, num: number) {
    const date = new Date(d)
    date.setDate(date.getDate() + num)
    return date
  }
}
