import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { DataStoreService } from 'src/app/shared/service/data-store.service'

@Component({
  templateUrl: './weekly-component.html',
  styleUrls: ['./weekly-component.scss']
})
export class WeeklyComponent implements OnInit, OnDestroy {
  form: FormGroup
  constructor(private dataStore: DataStoreService) {
    this.form = new FormGroup({
      frequency: new FormControl(null, [Validators.required, Validators.min(1)]),
      days: new FormControl(null)
    })
  }

  ngOnInit() {
    this.dataStore.type = 'weekly'
    this.form.valueChanges.subscribe(data => (this.dataStore.frequency = data))
    this.form.setValue({
      frequency: 1,
      days: [
        { name: 'Sun', active: false, id: 0 },
        { name: 'Mon', active: false, id: 1 },
        { name: 'Tue', active: false, id: 2 },
        { name: 'Wed', active: false, id: 3 },
        { name: 'Thu', active: false, id: 4 },
        { name: 'Fri', active: false, id: 5 },
        { name: 'Sat', active: false, id: 6 }
      ]
    })
  }

  ngOnDestroy() {
    this.dataStore.type = null
    this.dataStore.frequency = null
  }

  onDaysChanged(day: string) {
    const value: [{ name: string; active: boolean }] = this.form.get('days').value
    this.form.get('days').setValue(value.map(i => (i.name == day ? { ...i, active: !i.active } : i)))
  }
}
