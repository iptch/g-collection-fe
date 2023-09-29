import { Component } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { Observable, first, map } from 'rxjs';
import { Card } from 'src/app/models/card.model';
import { PageEvent } from '@angular/material/paginator';
import {
  changeCardsFilter,
  changeCardsPage,
  loadCards,
} from 'src/app/state/card/card.actions';

import {
  selectCardError,
  selectCardLoading,
  selectCardsFilteredAndPaged,
  selectCardsFilteredCount,
  selectCardsPageInfo,
  selectCardsShowAll,
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
  cards$?: Observable<Card[]>;
  cardsCount$: Observable<number>;
  showAll$: Observable<boolean>;
  initialPageInfo$: Observable<{ pageIndex: number; pageSize: number }>;

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
    this.showAll$ = this.store.select(selectCardsShowAll);
    this.cardsCount$ = this.store.select(selectCardsFilteredCount);
    this.cards$ = this.store.select(selectCardsFilteredAndPaged);
    this.initialPageInfo$ = this.store
      .select(selectCardsPageInfo)
      .pipe(first());
  }

  onShowAllChange(value: boolean) {
    this.store.dispatch(changeCardsFilter({ showAll: value }));
  }

  onPage(event: PageEvent) {
    this.store.dispatch(
      changeCardsPage({ pageSize: event.pageSize, pageIndex: event.pageIndex }),
    );
  }

  onSelectionChange(event: MatSelectChange) {
    const getLastName = (obj: Card) => obj?.name?.split(' ')?.pop() || obj.name;
    this.cards$ = this.cards$?.pipe(
      map((cards: Card[]) =>
        cards.sort((a: Card, b: Card) => {
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
      ),
    );
  }
}
