import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@app/core/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loading = false;
  errorMessage: string | null = null;

  loginForm = this.fb.group({
    email: this.fb.control('', [Validators.required, Validators.email]),
    password: this.fb.control('', [Validators.required]),
  });

  get email() {
    return this.loginForm.controls.email;
  }
  get password() {
    return this.loginForm.controls.password;
  }

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private route: ActivatedRoute) { }

  onSubmit() {
    if (this.loading) {
      return;
    }
    this.loading = true;
    this.errorMessage = null; // 'Network error';
    this.loginForm.disable();

    const { email, password } = this.loginForm.value;
    this.auth.login$({ email, password }).subscribe(
      () => {
        this.redirectBack();
      },
      err => {
        this.loading = false;
        this.errorMessage = err.message;
        this.loginForm.enable();
      }
    );
  }

  redirectBack() {
    if (this.route.snapshot.queryParams.redirectURL) {
      return this.router.navigate([this.route.snapshot.queryParams.redirectURL]);
    } else {
      return this.router.navigate(['/']);
    }
  }
}
