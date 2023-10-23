// src/app/features/login/login.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { postsReducer } from 'src/app/core/store/reducers/posts.reducer';
import { PostsEffects } from 'src/app/core/store/effects/posts.effect';
import { EffectsModule } from '@ngrx/effects';
import { AppRoutingModule } from 'src/app/app-routing.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    StoreModule.forRoot({
      postsState: postsReducer,
    }),
    EffectsModule.forRoot([PostsEffects]),
  ],
})
export class BlogModule {}
