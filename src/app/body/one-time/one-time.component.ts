import { DataStoreService } from './../../shared/service/data-store.service'
import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'

@Component({
  templateUrl: './one-time.component.html',
  styleUrls: ['./one-time.component.scss']
})
export class OneTimeComponent implements OnInit, OnDestroy {
  public form: FormGroup
  constructor(private dataStore: DataStoreService) {
    this.form = new FormGroup({
      'one-time': new FormControl(null, Validators.required)
    })
  }

  ngOnInit() {
    this.dataStore.type = 'one-time'
    this.form.valueChanges.subscribe(data => (this.dataStore.frequency = data))
    this.form.setValue({
      'one-time': new Date()
    })
  }

  ngOnDestroy() {
    this.dataStore.type = 'null'
    this.dataStore.frequency = null
  }
}
