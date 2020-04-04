import { Injectable } from '@angular/core'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'
import { LocalStorageService } from 'ngx-localstorage'

@Injectable()
export class ThemeService {
  private theme: string
  public cssUrl: SafeResourceUrl
  constructor(private sanitizer: DomSanitizer, private localStorage: LocalStorageService) {
    const theme = this.localStorage.get('theme')
    this.setTheme(theme ? theme : 'light')
  }
  public setTheme(theme: string) {
    this.theme = theme
    this.cssUrl = this.sanitizer.bypassSecurityTrustResourceUrl('assets/themes/' + this.theme + '.css')
    this.localStorage.set('theme', theme)
  }
}
