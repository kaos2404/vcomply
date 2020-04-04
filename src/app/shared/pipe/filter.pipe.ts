import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'appFilter',
  pure: true
})
export class FilterPipe implements PipeTransform {
  transform(arr: number[] = [], weekly: number[], holiday: string[], repeatDays: boolean) {
    const temp = []
    arr.forEach(i => {
      const t = new Date(i)
      let forced = false
      let dt = t.getDate() + '-' + t.getMonth() + '-' + t.getFullYear()
      while (
        weekly.indexOf(t.getDay()) > -1 ||
        holiday.indexOf(dt) > -1 ||
        (!repeatDays && !!temp.find(i => i.date == t.getTime()))
      ) {
        if (weekly.indexOf(t.getDay()) > -1 || holiday.indexOf(dt) > -1) {
          forced = true
        }
        t.setDate(t.getDate() + 1)
        dt = t.getDate() + '-' + t.getMonth() + '-' + t.getFullYear()
      }
      temp.push({ date: t.getTime(), forced })
    })
    return temp.sort((i, j) => i - j)
  }
}
