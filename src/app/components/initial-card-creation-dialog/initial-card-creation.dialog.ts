import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUser } from 'src/app/state/user/user.selectors';
import { map } from 'rxjs';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-initial-card-creation',
  templateUrl: 'initial-card-creation.dialog.html',
  styleUrls: ['initial-card-creation.dialog.scss'],
})
export class InitialCardCreationDialogComponent {
  private readonly store = inject(Store);
  private user$ = this.store.select(selectUser);
  userCardId$ = this.user$.pipe(map((user: User | null) => user?.['card_id']));
}
