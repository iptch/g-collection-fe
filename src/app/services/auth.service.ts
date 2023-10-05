import { Inject, Injectable } from '@angular/core';
import {
  MSAL_GUARD_CONFIG,
  MsalGuardConfiguration,
  MsalService,
} from '@azure/msal-angular';
import { InteractionType } from '@azure/msal-browser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    @Inject(MSAL_GUARD_CONFIG)
    private readonly msalGuardConfig: MsalGuardConfiguration,
    private readonly msalService: MsalService,
  ) {}

  isAuthenticated(): void {
    this.msalService.instance.getAllAccounts();
  }

  logout() {
    if (this.msalGuardConfig.interactionType === InteractionType.Popup) {
      this.msalService.logoutPopup({
        postLogoutRedirectUri: '/',
        mainWindowRedirectUri: '/',
      });
    } else {
      this.msalService.logoutRedirect({
        postLogoutRedirectUri: '/',
      });
    }
  }
}
