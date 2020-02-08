import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subject } from 'rxjs';
import { map, shareReplay, takeUntil, filter, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent implements OnInit, OnDestroy {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(result => result.matches),
    shareReplay()
  );
  onDestroy$ = new Subject<void>();

  @ViewChild('drawer', { static: true }) drawer: MatSidenav;

  constructor(private breakpointObserver: BreakpointObserver, private router: Router) { }

  ngOnInit() {
    // Auto close on navigation change
    this.isHandset$.pipe(
      filter((headset) => headset),
      switchMap(() => this.router.events),
      takeUntil(this.onDestroy$),
    ).subscribe(() => this.drawer.close());
  }

  ngOnDestroy() {
    this.onDestroy$.next();
  }
}
