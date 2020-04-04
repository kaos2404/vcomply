import { ThemeService } from './../../shared/service/theme.service'
import { Component } from '@angular/core'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public checked: boolean

  constructor(private themeService: ThemeService) {
    this.checked = false
  }

  onToggle(event: Event) {
    this.checked = !this.checked
    this.themeService.setTheme(this.checked ? 'dark' : 'light')
  }
}
