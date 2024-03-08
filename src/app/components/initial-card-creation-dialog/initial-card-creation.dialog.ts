import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatDialogRef } from '@angular/material/dialog';
import { UserCard } from 'src/app/models/card.model';
import { modifyCard } from 'src/app/state/card/card.actions';
import { selectUserCardId } from 'src/app/state/user/user.selectors';

@Component({
  selector: 'app-initial-card-creation',
  templateUrl: 'initial-card-creation.dialog.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InitialCardCreationDialogComponent {
  private readonly store = inject(Store);
  private readonly dialogRef = inject(
    MatDialogRef<InitialCardCreationDialogComponent>,
  );

  userCardId$ = this.store.select(selectUserCardId);

  saveUserCard(userCard: UserCard): void {
    this.store.dispatch(modifyCard({ userCard, dialogId: this.dialogRef.id }));
    this.dialogRef.componentRef?.destroy();
  }
}
