import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUser } from 'src/app/state/user/user.selectors';
import { map, switchMap } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { MatDialogRef } from '@angular/material/dialog';
import { selectCardById } from 'src/app/state/card/card.selectors';
import { Card, UserCard } from 'src/app/models/card.model';
import { modifyCard } from 'src/app/state/card/card.actions';

@Component({
  selector: 'app-initial-card-creation',
  templateUrl: 'initial-card-creation.dialog.html',
})
export class InitialCardCreationDialogComponent {
  private readonly store = inject(Store);
  private readonly dialogRef = inject(
    MatDialogRef<InitialCardCreationDialogComponent>,
  );

  private user$ = this.store.select(selectUser);
  userCardId$ = this.user$.pipe(map((user: User | null) => user?.['card_id']));

  saveUserCard(userCard: UserCard): void {
    this.store.dispatch(modifyCard({ userCard, dialogId: this.dialogRef.id }));
  }
}
