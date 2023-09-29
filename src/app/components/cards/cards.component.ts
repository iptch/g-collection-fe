import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Card } from 'src/app/models/card.model';
import { loadCards } from 'src/app/state/card/card.actions';
import {
  selectAllCards,
  selectCardError,
  selectCardLoading,
  selectOwnedCards,
} from 'src/app/state/card/card.selectors';

interface SortCriterion {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
})
export class CardsComponent {
  loading$?: Observable<boolean>;
  error$?: Observable<boolean>;
  allCards$?: Observable<Card[]>;
  ownedCards$?: Observable<Card[]>;

  showAll = false;

  readonly sortCriteria: SortCriterion[] = [
    { value: 'received', viewValue: 'Erhalt des Chärtlis' },
    { value: 'doublicates', viewValue: 'Anzahl Dubletten' },
    { value: 'acronym', viewValue: 'Kürzel' },
    { value: 'name', viewValue: 'Name' },
  ];

  constructor(private readonly store: Store) {
    this.store.dispatch(loadCards());
    this.loading$ = this.store.select(selectCardLoading);
    this.error$ = this.store.select(selectCardError);
    this.ownedCards$ = this.store.select(selectOwnedCards);
    this.allCards$ = this.store.select(selectAllCards);
  }
}
