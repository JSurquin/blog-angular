import { Injectable } from '@angular/core';
import { IAuth } from '../models/auth.model';
import {
  MsalModule,
  MsalService,
  MsalGuardConfiguration,
} from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLogin: boolean = false;
  constructor(
    private msalService: MsalService,
    private router: Router,
    private cookieService: CookieService
  ) {}
  users: IAuth[] = [
    {
      email: 'johndoe',
      password: 'password',
    },
  ];

  isLoggedIn(): boolean {
    if (this.msalService.instance.getActiveAccount() != null) {
      return true;
    } else if (this.isLogin === true) {
      return true;
    } else if (this.cookieService.get('isLoggedIn') === 'true') {
      return true;
    }
    return false;
  }

  // nous allons créer une fonction de login, qui utilise msalService pour nous donner la pop-up de connexion
  // nous allons nous inscrire au résultat (via subscribe) (l'équivalent d'un then d'une promesse) et nous allons utiliser la méthode
  // setActiveAccount pour mettre à jour le compte actif
  loginWithMicrosoft(): void {
    this.msalService
      .loginPopup()
      .subscribe((response: AuthenticationResult) => {
        this.msalService.instance.setActiveAccount(response.account);
        this.router.navigate(['/blog/add']);
      });
  }

  // nous allons créer une fonction logout, assez simple, pour utiliser le service de microsoft pour nous deconnecter
  // nous souscrivons au logout, si c'est un succes alors nous redirigerons vers la page d'accueil en suite (comme cela ça évite de rester sur la page de microsoft)
  logoutWithMicrosoft(): void {
    this.msalService
      .logout()
      .subscribe((response) => this.router.navigate(['/']));
  }

  login(username: string, password: string) {
    if (
      username === this.users[0].email &&
      password === this.users[0].password
    ) {
      console.log('Login successful');
      // façon classique
      this.isLogin = true;
      // avec un cookie plutot
      this.cookieService.set('isLoggedIn', 'true');
      this.router.navigate(['/blog/add']);
    }
  }

  subscribe(form: { email: string; password: string }) {
    console.log(form);
    console.log('bien inscris !');
    this.cookieService.set('isLoggedIn', 'true');
    this.router.navigate(['/blog/add']);
  }
}
