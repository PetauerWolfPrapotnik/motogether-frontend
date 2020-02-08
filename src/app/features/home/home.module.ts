import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatCardMdImage,
  MatCardModule,
  MatProgressBarModule,
  MatTableModule,
} from '@angular/material';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AboutComponent } from './pages/about/about.component';
import { TermsOfServiceComponent } from './pages/terms-of-service/terms-of-service.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './pages/profile/profile.component';
import { ChangePasswordComponent } from './pages/profile/change-password/change-password.component';
import { PathAddComponent } from './pages/path-add/path-add.component';
import { PathComponent } from './pages/path/path.component';

@NgModule({
  declarations: [
    // Pages
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AboutComponent,
    TermsOfServiceComponent,
    ProfileComponent,
    ChangePasswordComponent,
    PathAddComponent,
    PathComponent,

    // Components
  ],
  imports: [
    // Angular modules
    CommonModule,
    ReactiveFormsModule,

    // Routing
    HomeRoutingModule,

    // Extra
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressBarModule,
    MatTableModule
  ],
})
export class HomeModule {}
