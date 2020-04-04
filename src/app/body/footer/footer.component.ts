import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormGroup, Validators, FormControl } from '@angular/forms'
import { Router } from '@angular/router'
import { MatSnackBar } from '@angular/material/snack-bar'

import { UtilityService } from '../../shared/service/utility.service'
import { DataStoreService } from 'src/app/shared/service/data-store.service'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.componen.scss']
})
export class FooterComponent implements OnInit, OnDestroy {
  form: FormGroup
  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    public dataStore: DataStoreService,
    private utlity: UtilityService
  ) {
    this.form = new FormGroup({
      start: new FormControl(null, Validators.required),
      end: new FormControl(null, Validators.required),
      toggle: new FormControl(null),
      occurence: new FormControl(null)
    })
  }

  ngOnInit() {
    this.form.valueChanges.subscribe(data => (this.dataStore.limits = data))
    this.form.setValue({
      start: new Date(),
      end: new Date(),
      toggle: false,
      occurence: 1
    })
    this.form.get('occurence').valueChanges.subscribe(() => {
      this.form.get('toggle').setValue(true)
    })
    this.form.get('end').valueChanges.subscribe(() => {
      this.form.get('toggle').setValue(false)
    })
  }

  ngOnDestroy() {
    this.dataStore.limits = null
  }

  onNextClicked(event: Event) {
    const freq = this.dataStore.frequency
    const type = this.dataStore.type
    const start = new Date(this.dataStore.limits.start.getTime())
    const end = new Date(this.dataStore.limits.end.getTime())
    const toggle = this.dataStore.limits.toggle
    const occ = this.dataStore.limits.occurence
    start.setHours(0, 0, 0, 0)
    end.setHours(0, 0, 0, 0)
    const data = []
    if (type == 'daily') {
      if (
        isNaN(+freq.frequency) ||
        !freq.frequency ||
        freq.frequency < 1 ||
        !start ||
        (!end && !toggle) ||
        (toggle && (!occ || occ < 1))
      ) {
        return this.openSnackBar()
      } else if (toggle) {
        while (data.length < occ) {
          data.push(start.getTime())
          start.setDate(start.getDate() + +freq.frequency)
        }
      } else {
        while (start.getTime() <= end.getTime()) {
          data.push(start.getTime())
          start.setDate(start.getDate() + +freq.frequency)
        }
      }
    } else if (type == 'weekly') {
      if (
        isNaN(+freq.frequency) ||
        !freq.frequency ||
        freq.frequency < 1 ||
        !freq.days.find(i => i.active) ||
        !start ||
        (!end && !toggle) ||
        (toggle && (!occ || occ < 1))
      ) {
        return this.openSnackBar()
      } else if (toggle) {
        const active = freq.days.filter(i => i.active).map(i => i.id)
        while (data.length < occ) {
          if (active.indexOf(start.getDay()) > -1) {
            data.push(start.getTime())
          }
          start.setDate(start.getDate() + 1)
        }
      } else {
        const active = freq.days.filter(i => i.active).map(i => i.id)
        while (start.getTime() <= end.getTime()) {
          if (active.indexOf(start.getDay()) > -1) {
            data.push(start.getTime())
          }
          start.setDate(start.getDate() + 1)
        }
      }
    } else if (type == 'monthly') {
      if (
        isNaN(+freq.frequency) ||
        !freq.frequency ||
        freq.frequency < 1 ||
        freq.frequency > 31 ||
        !freq.months.find(i => i.active) ||
        !start ||
        (!end && !toggle) ||
        (toggle && (!occ || occ < 1))
      ) {
        return this.openSnackBar()
      } else if (toggle) {
        const active = freq.months.filter(i => i.active).map(i => i.id)
        while (start.getDate() != +freq.frequency) {
          start.setDate(start.getDate() + 1)
        }
        while (data.length < occ) {
          if (start.getDate() == +freq.frequency && active.indexOf(start.getMonth()) > -1) {
            data.push(start.getTime())
          }
          start.setMonth(start.getMonth() + 1)
          while (start.getDate() != +freq.frequency) {
            start.setDate(start.getDate() + 1)
          }
        }
      } else {
        const active = freq.months.filter(i => i.active).map(i => i.id)
        while (start.getTime() <= end.getTime() && start.getDate() != +freq.frequency) {
          start.setDate(start.getDate() + 1)
        }
        while (start.getTime() <= end.getTime()) {
          if (start.getDate() == +freq.frequency && active.indexOf(start.getMonth()) > -1) {
            data.push(start.getTime())
          }
          start.setMonth(start.getMonth() + 1)
          while (start.getTime() <= end.getTime() && start.getDate() != +freq.frequency) {
            start.setDate(start.getDate() + 1)
          }
        }
      }
    } else if (type == 'yearly') {
      if (
        isNaN(+freq.year) ||
        !freq.year ||
        isNaN(+freq.day) ||
        !freq.day ||
        freq.day < 1 ||
        freq.day > 31 ||
        !freq.months.find(i => i.active) ||
        !start ||
        (!end && !toggle) ||
        (toggle && (!occ || occ < 1))
      ) {
        return this.openSnackBar()
      } else if (toggle) {
        const active = freq.months.filter(i => i.active).map(i => i.id)
        while (start.getDate() != +freq.day || active.indexOf(start.getMonth()) == -1) {
          start.setDate(start.getDate() + 1)
        }
        while (data.length < occ) {
          if (start.getDate() == +freq.day && active.indexOf(start.getMonth()) > -1) {
            data.push(start.getTime())
          }
          start.setUTCFullYear(start.getUTCFullYear() + +freq.year)
          while (start.getDate() != +freq.day || active.indexOf(start.getMonth()) == -1) {
            start.setDate(start.getDate() + 1)
          }
        }
      } else {
        const active = freq.months.filter(i => i.active).map(i => i.id)
        while (
          start.getTime() <= end.getTime() &&
          (start.getDate() != +freq.day || active.indexOf(start.getMonth()) == -1)
        ) {
          start.setDate(start.getDate() + 1)
        }
        while (start.getTime() <= end.getTime()) {
          if (start.getDate() == +freq.day && active.indexOf(start.getMonth()) > -1) {
            data.push(start.getTime())
          }
          start.setUTCFullYear(start.getUTCFullYear() + +freq.year)
          while (
            start.getTime() <= end.getTime() &&
            (start.getDate() != +freq.day || active.indexOf(start.getMonth()) == -1)
          ) {
            start.setDate(start.getDate() + 1)
          }
        }
      }
    } else if (type == 'one-time') {
      if (!freq['one-time']) {
        return this.openSnackBar()
      } else {
        data.push(freq['one-time'].getTime())
      }
    } else {
      this.openSnackBar('Something went wrong')
    }

    this.dataStore.list = data
    this.router.navigate(['/result'])
  }

  private openSnackBar(message: string = 'Please verify your input', action: string = 'Dismiss') {
    this._snackBar.open(message, action, {
      duration: 4000
    })
  }
}
