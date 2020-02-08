import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@app/core/auth/auth.service';

@Component({
  selector: 'app-path-add',
  templateUrl: './path-add.component.html',
  styleUrls: ['./path-add.component.scss']
})
export class PathAddComponent {
  loading = false;
  errorMessage: string | null = null;

  pathAddForm = this.fb.group({
    title: this.fb.control('', [Validators.required]),
    description: this.fb.control('', [Validators.required]),


    startTime: this.fb.control('', [Validators.required]),
    locationStart: this.fb.control('', [Validators.required]),
    locationEnd: this.fb.control('', [Validators.required]),
  });

  constructor(private fb: FormBuilder, private auth: AuthService) { }

  onSubmit() {
    if (this.loading) {
      return;
    }
    this.loading = true;
    this.errorMessage = null; // 'Network error';
    this.pathAddForm.disable();


  }
}
