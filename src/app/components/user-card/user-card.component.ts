import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { UserCard } from 'src/app/models/card.model';
import { User } from 'src/app/models/user.model';
import { modifyCard } from 'src/app/state/card/card.actions';
import { selectUser } from 'src/app/state/user/user.selectors';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
})
export class UserCardComponent {
  private readonly store = inject(Store);

  user$ = this.store.select(selectUser);
  userCardId$ = this.user$.pipe(map((user: User | null) => user?.['card_id']));

  saveUserCard(userCard: UserCard): void {
    this.store.dispatch(modifyCard({ userCard }));
  }
}
