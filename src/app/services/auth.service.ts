import { Injectable } from '@angular/core';
import { Inject } from '@angular/core';
import {
  MsalService,
  MSAL_GUARD_CONFIG,
  MsalGuardConfiguration,
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

  isAuthenticated() {
    return this.msalService.instance.getAllAccounts().length > 0;
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
