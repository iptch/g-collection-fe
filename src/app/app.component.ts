import { Component, OnDestroy, OnInit } from '@angular/core';
import { MsalBroadcastService } from '@azure/msal-angular';
import { InteractionStatus } from '@azure/msal-browser';
import { Store } from '@ngrx/store';
import { Subject, tap } from 'rxjs';
import { filter, first, takeUntil } from 'rxjs/operators';
import { AuthService } from './services/auth.service';
import { loadProfile } from './state/profile/profile.actions';
import * as UserActions from './state/user/user.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
  isIframe = false;
  authenticated = false;

  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly store: Store,
    private readonly msalBroadcastService: MsalBroadcastService,
    private readonly authService: AuthService,
  ) {
    this.store.dispatch(loadProfile());
  }

  ngOnInit(): void {
    this.isIframe = window !== window.parent && !window.opener;
    this.msalBroadcastService.inProgress$
      .pipe(
        filter(
          (status: InteractionStatus) => status === InteractionStatus.None,
        ),
        first(),
        tap(() => this.store.dispatch(UserActions.initUser())),
        takeUntil(this.destroy$),
      )
      .subscribe(() => {
        this.showApp();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(undefined);
    this.destroy$.complete();
  }

  showApp() {
    this.authenticated = this.authService.isAuthenticated();
  }
}
