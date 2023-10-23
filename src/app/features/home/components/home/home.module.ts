// src/app/features/login/login.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { TranslocoModule } from '@ngneat/transloco';
import { TranslocoRootModule } from 'src/app/shared/translate/transloco-root.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, TranslocoModule],
})
export class HomeModule {}
