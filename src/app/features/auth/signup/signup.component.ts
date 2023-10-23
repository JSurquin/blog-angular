import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  signUpForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.signUpForm = this.fb.group({
      email: '',
      password: '',
      password_confirmation: '',
    });
  }

  subscribe(): void {
    this.authService.subscribe(this.signUpForm.value);
  }

  loginWithMicrosoft(): void {
    this.authService.loginWithMicrosoft();
  }
}
