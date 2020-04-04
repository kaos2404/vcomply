import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms'
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { DataStoreService } from '../shared/service/data-store.service'
import { UtilityService } from '../shared/service/utility.service'

@Component({
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.scss']
})
export class HolidaysComponent implements OnInit {
  public holidays: FormArray
  public weekly: FormControl
  constructor(public dataStore: DataStoreService, private router: Router, public utility: UtilityService) {
    this.holidays = new FormArray([])
    this.weekly = new FormControl(null)
  }

  ngOnInit() {
    this.holidays.valueChanges.subscribe(data => {
      console.log(data)
      this.utility.setHolidays(data)
    })
    this.weekly.valueChanges.subscribe(data => {
      console.log(data)
      this.utility.setWeekly(data)
    })

    this.utility.getHolidays().forEach(i =>
      this.holidays.push(
        new FormGroup({
          name: new FormControl(i.name),
          date: new FormControl(new Date(i.date))
        })
      )
    )
    this.weekly.setValue(this.utility.getWeekly())
  }

  onDayClicked(event: Event, name: string) {
    this.weekly.setValue(this.weekly.value.map(i => ({ ...i, active: i.name == name ? !i.active : i.active })))
  }

  onAddHoliday(event: Event) {
    this.holidays.push(
      new FormGroup({
        name: new FormControl('Holiday', Validators.required),
        date: new FormControl(new Date(), Validators.required)
      })
    )
  }

  onDelete(event: Event, index: number) {
    this.holidays.removeAt(index)
  }

  onBackClicked(event: Event) {
    window.history.back()
  }
}
