import { Component, OnInit, OnDestroy } from '@angular/core';
import { MsalBroadcastService } from '@azure/msal-angular';
import { InteractionStatus } from '@azure/msal-browser';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { AuthService } from './services/auth.service';
import { Store } from '@ngrx/store';
import { loadProfile } from './state/profile/profile.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
  isIframe = false;
  loginDisplay = false;

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
        takeUntil(this.destroy$),
      )
      .subscribe(() => {
        this.setLoginDisplay();
        // TODO: Create user if not exists via BE call
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(undefined);
    this.destroy$.complete();
  }

  setLoginDisplay() {
    this.loginDisplay = this.authService.isAuthenticated();
  }
}
