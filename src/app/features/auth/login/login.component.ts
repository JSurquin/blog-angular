import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IAuth } from 'src/app/core/models/auth.model';
import { AuthService } from 'src/app/core/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm!: FormGroup<any>;
  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: '',
      password: '',
    });
  }

  login() {
    this.authService.login(
      this.loginForm.value.email,
      this.loginForm.value.password
    );
  }

  loginWithMicrosoft(): void {
    this.authService.loginWithMicrosoft();
  }
}
