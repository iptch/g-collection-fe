import { Component, OnDestroy, OnInit } from '@angular/core';
import { MsalBroadcastService } from '@azure/msal-angular';
import { InteractionStatus } from '@azure/msal-browser';
import { Store } from '@ngrx/store';
import { Observable, Subject, switchMap, tap } from 'rxjs';
import { filter, first, takeUntil } from 'rxjs/operators';
import { AuthService } from './services/auth.service';
import { loadProfile } from './state/profile/profile.actions';
import { UserService } from './services/user.service';
import * as UserActions from './state/user/user.actions';
import {
  selectUserError,
  selectUserLoading,
  selectUserStatus,
} from './state/user/user.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
  isIframe = false;

  loading$: Observable<boolean>;
  error$: Observable<boolean>;
  status$: Observable<string | undefined>;

  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly store: Store,
    private readonly msalBroadcastService: MsalBroadcastService,
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {
    this.store.dispatch(loadProfile());
    this.loading$ = this.store.select(selectUserLoading);
    this.error$ = this.store.select(selectUserError);
    this.status$ = this.store.select(selectUserStatus);
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
        switchMap(() => this.userService.initUser()),
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
    this.authService.isAuthenticated();
  }
}
