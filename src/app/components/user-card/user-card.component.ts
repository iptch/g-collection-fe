import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserCard } from 'src/app/models/card.model';
import { modifyCard } from 'src/app/state/card/card.actions';
import { selectUserCardId } from 'src/app/state/user/user.selectors';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
})
export class UserCardComponent {
  private readonly store = inject(Store);

  userCardId$ = this.store.select(selectUserCardId);

  saveUserCard(userCard: UserCard): void {
    this.store.dispatch(modifyCard({ userCard }));
  }
}
