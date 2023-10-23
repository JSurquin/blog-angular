import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './features/auth/signup/signup.component';
import { LoginComponent } from './features/auth/login/login.component';
import { HomeComponent } from './features/blog/components/home/home.component';
import { ArticleComponent } from './features/blog/components/article/article.component';
import { CreateArticleComponent } from './features/blog/components/create-article/create-article.component';
import { AuthGuard } from './core/guards/auth.guard';
import { HomeComponent as AccueilComponent } from './features/home/components/home/home.component';
const routes: Routes = [
  { path: '', component: AccueilComponent },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/login/login.module').then((m) => m.LoginModule),
  },
  { path: 'auth/signup', component: SignupComponent },
  { path: 'blog', component: HomeComponent },
  {
    path: 'blog/add',
    component: CreateArticleComponent,
    canActivate: [AuthGuard],
  },
  { path: 'blog/:id', component: ArticleComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
