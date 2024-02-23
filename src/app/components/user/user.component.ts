import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Store } from '@ngrx/store';
import { selectUser } from 'src/app/state/user/user.selectors';
import { User } from 'src/app/models/user.model';
import { inject } from '@angular/core';
import { map } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
})
export class UserComponent {
  private readonly store = inject(Store);
  private readonly authService = inject(AuthService);

  user$ = this.store.select(selectUser);
  userCardId$ = this.user$.pipe(map((user: User | null) => user?.['card_id']));

  logout() {
    this.authService.logout();
  }
}
