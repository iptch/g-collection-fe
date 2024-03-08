import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Store } from '@ngrx/store';
import { selectUser } from 'src/app/state/user/user.selectors';
import { inject } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
})
export class UserComponent {
  private readonly store = inject(Store);
  private readonly authService = inject(AuthService);

  user$ = this.store.select(selectUser);

  logout() {
    this.authService.logout();
  }
}
