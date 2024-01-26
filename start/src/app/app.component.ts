import { Component, inject, signal } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'start';
  loader = false;

  constructor() {
    const router = inject(Router)
      router.events
        .pipe(
          filter(events => events instanceof NavigationStart),
          takeUntilDestroyed()
        ).subscribe(() => this.loader = true);
      router.events
        .pipe(
          filter(events => events instanceof NavigationEnd),
          takeUntilDestroyed()
        ).subscribe(() => this.loader = false);
  }
}

