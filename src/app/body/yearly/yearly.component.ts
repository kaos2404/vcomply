import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { DataStoreService } from 'src/app/shared/service/data-store.service'

@Component({
  templateUrl: './yearly.component.html',
  styleUrls: ['./yearly.component.scss']
})
export class YearlyComponent implements OnInit, OnDestroy {
  form: FormGroup
  constructor(private dataStore: DataStoreService) {
    this.form = new FormGroup({
      year: new FormControl(null, [Validators.required, Validators.min(1)]),
      day: new FormControl(null, [Validators.required, Validators.max(31), Validators.min(1)]),
      months: new FormControl()
    })
  }

  ngOnInit() {
    this.dataStore.type = 'yearly'
    this.form.valueChanges.subscribe(data => (this.dataStore.frequency = data))
    this.form.setValue({
      year: 1,
      day: 1,
      months: [
        { name: 'Jan', active: true, id: 0 },
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

  onMonthChanged(day: string) {
    const value: [{ name: string; active: boolean }] = this.form.get('months').value
    this.form.get('months').setValue(
      value.map(i => ({
        ...i,
        active: i.name == day
      }))
    )
  }
}
