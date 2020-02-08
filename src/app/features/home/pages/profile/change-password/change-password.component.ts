import { Component, OnInit, Input } from '@angular/core';
import { IUser, AuthService } from '@app/core/auth/auth.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  @Input() profile: IUser;

  loading = false;
  errorMessage: string | null = null;

  changePasswordGroup = this.fb.group({
    oldPassword: this.fb.control('', [Validators.required]),
    newPassword: this.fb.control('', [Validators.required]),
    rePassword: this.fb.control('', [Validators.required]),
  });

  constructor(private fb: FormBuilder, private auth: AuthService) { }

  onSubmit() {
    if (this.loading) { return; }
    this.loading = true;
    this.errorMessage = null;
    this.changePasswordGroup.disable();

    const { oldPassword, newPassword } = this.changePasswordGroup.value;

    this.auth.changePassword$({ oldPassword, newPassword }).subscribe(
      () => { alert('Success'); },
      err => {
        this.loading = false;
        this.errorMessage = err.message;
        this.changePasswordGroup.enable();
      }
    );
  }

}
