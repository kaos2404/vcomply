import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { MAT_DATEPICKER_VALIDATORS } from '@angular/material/datepicker'
import { DataStoreService } from 'src/app/shared/service/data-store.service'

@Component({
  templateUrl: './monthly.component.html',
  styleUrls: ['./monthly.component.scss']
})
export class MonthlyComponent implements OnInit, OnDestroy {
  form: FormGroup
  constructor(private dataStore: DataStoreService) {
    this.form = new FormGroup({
      frequency: new FormControl(null, [Validators.required, Validators.max(31), Validators.min(1)]),
      months: new FormControl(null)
    })
  }

  ngOnInit() {
    this.dataStore.type = 'monthly'
    this.form.valueChanges.subscribe(data => (this.dataStore.frequency = data))
    this.form.setValue({
      frequency: 1,
      months: [
        { name: 'Jan', active: false, id: 0 },
        { name: 'Feb', active: false, id: 1 },
        { name: 'Mar', active: false, id: 2 },
        { name: 'Apr', active: false, id: 3 },
        { name: 'May', active: false, id: 4 },
        { name: 'Jun', active: false, id: 5 },
        { name: 'Jul', active: false, id: 6 },
        { name: 'Aug', active: false, id: 7 },
        { name: 'Sep', active: false, id: 8 },
        { name: 'Oct', active: false, id: 9 },
        { name: 'Nov', active: false, id: 10 },
        { name: 'Dec', active: false, id: 11 }
      ]
    })
  }

  ngOnDestroy() {
    this.dataStore.type = null
    this.dataStore.frequency = null
  }

  onMonthsChanged(day: string) {
    const value: [{ name: string; active: boolean }] = this.form.get('months').value
    this.form.get('months').setValue(value.map(i => (i.name == day ? { ...i, active: !i.active } : i)))
  }
}
