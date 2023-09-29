import { Component } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { Card, Cards } from 'src/app/models/card.model';
import { loadCards } from 'src/app/state/card/card.actions';
import { CardService } from 'src/app/services/card.service';
import {
  selectAllCards,
  selectCardError,
  selectCardLoading,
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
  cards$?: Observable<Cards>;

  readonly sortCriteria: SortCriterion[] = [
    { value: 'received', viewValue: 'Erhalt des Chärtlis' },
    { value: 'doublicates', viewValue: 'Anzahl Dubletten' },
    { value: 'acronym', viewValue: 'Kürzel' },
    { value: 'name', viewValue: 'Name' },
  ];

  constructor(
    private readonly store: Store,
    private readonly cardService: CardService,
  ) {
    this.store.dispatch(loadCards());
    this.loading$ = this.store.select(selectCardLoading);
    this.error$ = this.store.select(selectCardError);
    this.cards$ = this.store.select(selectAllCards);
  }

  onSelectionChange(event: MatSelectChange) {
    const getLastName = (obj: Card) => obj?.name?.split(' ')?.pop() || obj.name;

    this.cards$ = this.cards$?.pipe(
      map((cards: Cards) => {
        return {
          ...cards,
          results: cards.results.sort((a: Card, b: Card) => {
            switch (event.value) {
              case 'acronym':
                return a.acronym > b.acronym ? 1 : -1;
              case 'name':
                return getLastName(a) > getLastName(b) ? 1 : -1;
              case 'received':
              case 'doublicates':
              default:
                return 0;
            }
          }),
        };
      }),
    );
  }
}
