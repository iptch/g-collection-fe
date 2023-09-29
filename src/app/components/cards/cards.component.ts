import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { first, Observable } from 'rxjs';
import { Card } from 'src/app/models/card.model';
import { PageEvent } from '@angular/material/paginator';
import {
  changeCardsFilter,
  changeCardsPage,
  changeCardsSort,
  changeCardsSortDirection,
  loadCards,
} from 'src/app/state/card/card.actions';

import {
  selectCardError,
  selectCardLoading,
  selectCardsFilteredAndPaged,
  selectCardsFilteredCount,
  selectCardsPageInfo,
  selectCardsShowAll,
  selectCardsSort,
  selectCardsSortDirection,
} from 'src/app/state/card/card.selectors';
import { MatSelectChange } from '@angular/material/select';

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
  sort$?: string;
  sortDirection$?: Observable<boolean>;
  initialPageInfo$: Observable<{
    pageIndex: number;
    pageSize: number;
  }>;

  readonly sortCriteria: SortCriterion[] = [
    { value: 'received', viewValue: 'Erhalt des Chärtlis' },
    { value: 'duplicates', viewValue: 'Anzahl Dubletten' },
    { value: 'acronym', viewValue: 'Kürzel' },
    { value: 'name', viewValue: 'Nachname' },
  ];

  constructor(private readonly store: Store) {
    this.store.dispatch(loadCards());
    this.loading$ = this.store.select(selectCardLoading);
    this.error$ = this.store.select(selectCardError);
    this.showAll$ = this.store.select(selectCardsShowAll);
    this.cardsCount$ = this.store.select(selectCardsFilteredCount);
    this.cards$ = this.store.select(selectCardsFilteredAndPaged);
    this.sortDirection$ = this.store.select(selectCardsSortDirection);
    this.store
      .select(selectCardsSort)
      .pipe()
      .subscribe((sort) => {
        this.sort$ = sort;
      });
    this.initialPageInfo$ = this.store
      .select(selectCardsPageInfo)
      .pipe(first());
  }

  onShowAllChange(value: boolean) {
    this.store.dispatch(changeCardsFilter({ showAll: value }));
  }

  onSortDirectionChange() {
    this.store.dispatch(changeCardsSortDirection());
  }

  onPage(event: PageEvent) {
    this.store.dispatch(
      changeCardsPage({ pageSize: event.pageSize, pageIndex: event.pageIndex }),
    );
  }

  onSort(event: MatSelectChange) {
    this.store.dispatch(changeCardsSort({ sort: event.value }));
  }
}
