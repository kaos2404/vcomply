import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { CommonModule } from '@angular/common'

import { MaterialModule } from '../shared/material.module'

import { HeaderComponent } from './header/header.component'
import { FooterComponent } from './footer/footer.component'
import { BodyComponent } from './body.component'
import { DailyComponent } from './daily/daily.component'
import { WeeklyComponent } from './weekly/weekly-component'
import { MonthlyComponent } from './monthly/monthly.component'
import { YearlyComponent } from './yearly/yearly.component'
import { OneTimeComponent } from './one-time/one-time.component'

const routes: Routes = [
  {
    path: 'frequency',
    component: BodyComponent,
    children: [
      { path: 'daily', component: DailyComponent },
      { path: 'weekly', component: WeeklyComponent },
      { path: 'monthly', component: MonthlyComponent },
      { path: 'yearly', component: YearlyComponent },
      { path: 'one-time', component: OneTimeComponent }
    ]
  }
]

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    BodyComponent,
    DailyComponent,
    WeeklyComponent,
    MonthlyComponent,
    YearlyComponent,
    OneTimeComponent
  ],
  imports: [CommonModule, RouterModule.forChild(routes), MaterialModule]
})
export class BodyModule {}
