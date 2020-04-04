import { Component, OnInit } from '@angular/core'
import { DataStoreService } from '../shared/service/data-store.service'
import { Router } from '@angular/router'
import { UtilityService } from '../shared/service/utility.service'

@Component({
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultComponent implements OnInit {
  public list: number[]
  public weekly: number[]
  public holidays: string[]
  public checked: boolean
  constructor(private router: Router, private dataStore: DataStoreService, private utility: UtilityService) {
    this.checked = false
  }

  ngOnInit() {
    this.list = this.dataStore.list
    if (!this.list) {
      this.router.navigate(['/home', 'frequency', 'daily'])
    }
    this.weekly = this.utility
      .getWeekly()
      .filter(i => i.active)
      .map(i => i.id)
    this.holidays = this.utility.getHolidays().map(i => {
      const t = new Date(i.date)
      return t.getDate() + '-' + t.getMonth() + '-' + t.getFullYear()
    })
  }

  onBackClicked(event: Event) {
    window.history.back()
  }
}
