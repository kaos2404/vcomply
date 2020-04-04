import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule, Routes } from '@angular/router'
import { ServiceWorkerModule } from '@angular/service-worker'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { environment } from '../environments/environment'
import { AppComponent } from './app.component'

import { BodyModule } from './body/body.module'
import { MaterialModule } from './shared/material.module'
import { NgxLocalStorageModule } from 'ngx-localstorage'
import { HolidaysComponent } from './holidays/holidays.component'
import { ResultComponent } from './results/results.component'
import { FilterPipe } from './shared/pipe/filter.pipe'

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home/frequency/daily' },
  { path: 'holidays', component: HolidaysComponent },
  { path: 'result', component: ResultComponent },
  { path: 'home', loadChildren: () => import('./body/body.module').then(m => m.BodyModule) },
  { path: '**', redirectTo: '/home/frequency/daily' }
]

@NgModule({
  declarations: [AppComponent, HolidaysComponent, ResultComponent, FilterPipe],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BodyModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgxLocalStorageModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
