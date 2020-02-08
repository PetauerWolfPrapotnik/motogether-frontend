import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, tap, filter, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

export interface IUser {
  id: string;

  email: string;
  email_verified: true;

  first_name: string;
  last_name: string;
  nickname?: string;

  password: string;

  created_at: string;
  updated_at: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister {
  email: string;

  first_name: string;
  last_name: string;
  nickname?: string;

  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly baseURL = '/api';

  /**
   * Keps track if the initial request has ben sent
   */
  private initialized$ = new BehaviorSubject<boolean>(false);
  /**
   * Keps track of the currently profile
   */
  private profileSubject$ = new BehaviorSubject<IUser | null>(null);

  /**
   * Waits until initialized then send the current profile as an observable
   */
  profile$ = this.initialized$.asObservable().pipe(
    filter(init => init),
    switchMap(() => this.profileSubject$.asObservable())
  );

  /**
   * Utility observable to check if user is authenticated
   */
  isAuthenticated$ = this.profile$.pipe(map(profile => profile !== null));

  constructor(private http: HttpClient, private router: Router) {}

  /**
   * This function MUST be run once at the start of the aplication. Preferably in AppComponent.
   */
  async initAuth() {
    try {
      await this.userInfo$().toPromise();
    } catch (e) {
      if (!(e && e.status === 401)) {
        throw e;
      }
    }
    this.initialized$.next(true);
  }

  requestLogin(redirectURL?: string) {
    return this.router.navigate(['/login'], { queryParams: { redirectURL } });
  }

  //
  // API Calls
  //

  /**
   * Gets the currenty loggen in users information
   */
  userInfo$() {
    return this.http.get<IUser>(`${this.baseURL}/userinfo`).pipe(
      tap(
        user => this.profileSubject$.next(user),
        err => {
          if (err.status === 401) {
            this.profileSubject$.next(null);
          }
        }
      )
    );
  }

  /**
   * Logs the user in using the supplied credentials
   * @param credentials The credentials
   */
  login$(credentials: ILogin) {
    return this.http.post<IUser>(`${this.baseURL}/login`, credentials).pipe(
      tap(
        user => this.profileSubject$.next(user),
        err => {
          if (err.status === 401) {
            this.profileSubject$.next(null);
          }
        }
      )
    );
  }

  /**
   * Logs out the current user
   */
  logout$() {
    const oldData = this.profileSubject$.value;
    if (!oldData) {
      return;
    }

    this.profileSubject$.next(null);
    return this.http.post<IUser>(`${this.baseURL}/logout`, null).pipe(
      tap(
        () => {},
        err => {
          if (err && err.status === 401) {
            return;
          }
          this.profileSubject$.next(oldData);
        }
      )
    );
  }

  /**
   * Registers a new user account
   * @param user The registration info
   */
  register$(user: IRegister) {
    return this.http.post<IUser>(`${this.baseURL}/register`, user);
  }
}
