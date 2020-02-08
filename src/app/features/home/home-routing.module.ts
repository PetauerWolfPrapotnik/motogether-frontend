import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { TermsOfServiceComponent } from './pages/terms-of-service/terms-of-service.component';
import { AboutComponent } from './pages/about/about.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuthGuard } from '@app/core/auth/auth.guard';
import { PathAddComponent } from './pages/path-add/path-add.component';
import { PathComponent } from './pages/path/path.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'path-add', component: PathAddComponent, canActivate: [AuthGuard] },
  { path: 'path/:id', component: PathComponent, canActivate: [AuthGuard] },

  { path: 'about', component: AboutComponent },
  { path: 'terms-of-service', component: TermsOfServiceComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule { }
