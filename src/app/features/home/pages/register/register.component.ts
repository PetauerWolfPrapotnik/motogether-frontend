import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '@app/core/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  loading = false;
  errorMessage: string | null = null;

  registerForm = this.fb.group({
    email: this.fb.control('', [Validators.required, Validators.email]),

    first_name: this.fb.control('', [Validators.required]),
    last_name: this.fb.control('', [Validators.required]),
    nickname: this.fb.control('', []),

    password: this.fb.control('', [Validators.required]),
    rePassword: this.fb.control('', [Validators.required]),
  });

  get email() {
    return this.registerForm.controls.email;
  }
  get first_name() {
    return this.registerForm.controls.first_name;
  }
  get last_name() {
    return this.registerForm.controls.last_name;
  }
  get nickname() {
    return this.registerForm.controls.nickname;
  }
  get password() {
    return this.registerForm.controls.password;
  }
  get rePassword() {
    return this.registerForm.controls.rePassword;
  }

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}

  onSubmit() {
    if (this.loading) {
      return;
    }
    this.loading = true;
    this.errorMessage = null; // 'Network error';
    this.registerForm.disable();

    const { email, first_name, last_name, nickname, password } = this.registerForm.value;
    this.auth.register$({ email, first_name, last_name, nickname, password }).subscribe(
      () => {
        this.router.navigate(['/login']);
      },
      err => {
        this.loading = false;
        this.errorMessage = err.message;
        this.registerForm.enable();
      }
    );
  }
}
