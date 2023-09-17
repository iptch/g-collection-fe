import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Card } from 'src/app/models/card.model';
import { loadCards } from 'src/app/state/card/card.actions';
import {
  selectAllCards,
  selectCardError,
  selectCardLoading,
} from 'src/app/state/card/card.selectors';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
})
export class CardsComponent {
  loading$?: Observable<boolean>;
  error$?: Observable<boolean>;
  cards$?: Observable<Card[]>;

  constructor(private readonly store: Store) {
    this.store.dispatch(loadCards());
    this.loading$ = this.store.select(selectCardLoading);
    this.error$ = this.store.select(selectCardError);
    this.cards$ = this.store.select(selectAllCards);
  }
}
