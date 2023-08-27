import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Profile } from 'src/app/models/profile.model';
import { Store } from '@ngrx/store';
import {
  selectProfile,
  selectProfileLoading,
} from 'src/app/state/profile/profile.selectors';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  loading$: Observable<boolean>;
  profile$: Observable<Profile>;

  constructor(
    private readonly store: Store,
    private readonly authService: AuthService,
  ) {
    this.loading$ = this.store.select(selectProfileLoading);
    this.profile$ = this.store.select(selectProfile);
  }

  logout() {
    this.authService.logout();
  }
}
