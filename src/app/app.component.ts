import { Component } from '@angular/core'

import { ThemeService } from './shared/service/theme.service'
import { DataStoreService } from './shared/service/data-store.service'
import { UtilityService } from './shared/service/utility.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ThemeService, DataStoreService, UtilityService]
})
export class AppComponent {
  title = 'due-date'

  constructor(public themeService: ThemeService) {}
}
