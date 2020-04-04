import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { DataStoreService } from 'src/app/shared/service/data-store.service'

@Component({
  templateUrl: './daily.component.html',
  styleUrls: ['./daily.component.scss']
})
export class DailyComponent implements OnInit, OnDestroy {
  form: FormGroup
  constructor(private dataStore: DataStoreService) {
    this.form = new FormGroup({
      frequency: new FormControl(null, [Validators.required, Validators.min(1)])
    })
  }

  ngOnInit() {
    this.dataStore.type = 'daily'
    this.form.valueChanges.subscribe(data => (this.dataStore.frequency = data))
    this.form.setValue({
      frequency: 1
    })
  }

  ngOnDestroy() {
    this.dataStore.type = null
    this.dataStore.frequency = null
  }
}
