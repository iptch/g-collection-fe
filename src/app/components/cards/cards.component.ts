import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Card } from 'src/app/models/card.model';
import { loadCards } from 'src/app/state/card/card.actions';
import {
  selectAllCards,
  selectCardLoading,
} from 'src/app/state/card/card.selectors';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
})
export class CardsComponent {
  loading$?: Observable<boolean>;
  cards$?: Observable<Card[]>;

  constructor(private store: Store) {
    this.store.dispatch(loadCards());
    this.loading$ = this.store.select(selectCardLoading);
    this.cards$ = this.store.select(selectAllCards);
  }
}
