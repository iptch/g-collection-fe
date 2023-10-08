import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Store } from '@ngrx/store';
import { selectUser } from 'src/app/state/user/user.selectors';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
})
export class UserComponent {
  user$: Observable<User | null>;

  constructor(
    private readonly store: Store,
    private readonly authService: AuthService,
  ) {
    this.user$ = this.store.select(selectUser);
  }

  logout() {
    this.authService.logout();
  }
}
