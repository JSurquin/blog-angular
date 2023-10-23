import { Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { AuthService } from 'src/app/core/services/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(
    private translocoService: TranslocoService,
    private authService: AuthService
  ) {}

  changeLanguage(language: EventTarget | null): void {
    const selectedLanguage = (event?.target as HTMLSelectElement)?.value;
    this.translocoService.setActiveLang(selectedLanguage);
  }
  checkIsLogged(): boolean {
    return this.authService.isLoggedIn();
  }
}
