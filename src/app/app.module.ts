import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { LoginComponent } from './features/auth/login/login.component';
import { SignupComponent } from './features/auth/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { ArticleComponent } from './features/blog/components/article/article.component';
import { HomeComponent } from './features/blog/components/home/home.component';
import { HomeComponent as AccueilComponent } from './features/home/components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { CreateArticleComponent } from './features/blog/components/create-article/create-article.component';
import {
  IPublicClientApplication,
  PublicClientApplication,
  InteractionType,
} from '@azure/msal-browser';
import {
  MsalModule,
  MsalService,
  MsalGuard,
  MSAL_INSTANCE,
  MSAL_GUARD_CONFIG,
  MsalRedirectComponent,
  MsalGuardConfiguration,
} from '@azure/msal-angular';
import { TranslocoRootModule } from './shared/translate/transloco-root.module';
import { PostsEffects } from './core/store/effects/posts.effect';
import { postsReducer } from './core/store/reducers/posts.reducer';
import { LoginModule } from './features/auth/login/login.module';
import { SignUpModule } from './features/auth/signup/signup.module';
import { HomeModule as AccueilModule } from './features/home/components/home/home.module';
import { BlogModule } from './features/blog/components/home/blog.module';
// MsalModule étant notre module, à importer dans imports
// MsalService étant le service proposé par microsoft pour faire la connexion
// MSAL_INSTANCE étant juste un type pour préciser ce que nous cherchons à faire comme action
// MsalRedirectComponent va se placer dans bootstrap pour : à préciser
// Qui va nous permettre de créer le client via PublicClientApplication, et IPublicClientApplication étant l’interface pour typer notre PublicClientApplication

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: ['user.read'],
    },
  };
}

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: 'd7452ac1-b83a-4b37-88da-e87efe6d8e4a',
      redirectUri: 'http://localhost:4200',
    },
  });
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    ArticleComponent,
    CreateArticleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BlogModule,
    LoginModule,
    AccueilModule,
    SignUpModule,
    MsalModule,
    StoreModule.forRoot({
      postsState: postsReducer,
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
      connectOutsideZone: true, // If set to true, the connection is established outside the Angular zone for better performance
    }),
    EffectsModule.forRoot([PostsEffects]),
    TranslocoRootModule,
  ],
  providers: [
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory,
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory,
    },
    MsalService,
    MsalGuard,
  ],
  bootstrap: [AppComponent, MsalRedirectComponent],
})
export class AppModule {}
