import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Card } from 'src/app/models/card.model';
import { CardSort } from 'src/app/models/card-sort.enum';
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

interface SortCriterion {
  value: CardSort;
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
  sort$?: Observable<string>;
  sortDirection$?: Observable<boolean>;
  pageInfo$: Observable<{
    pageIndex: number;
    pageSize: number;
  }>;

  readonly sortCriteria: SortCriterion[] = [
    { value: CardSort.Received, viewValue: 'Erhalt des Chärtlis' },
    { value: CardSort.Duplicates, viewValue: 'Anzahl Dubletten' },
    { value: CardSort.Acronym, viewValue: 'Kürzel' },
    { value: CardSort.Name, viewValue: 'Name' },
  ];

  constructor(private readonly store: Store) {
    this.store.dispatch(loadCards());
    this.loading$ = this.store.select(selectCardLoading);
    this.error$ = this.store.select(selectCardError);
    this.showAll$ = this.store.select(selectCardsShowAll);
    this.cardsCount$ = this.store.select(selectCardsFilteredCount);
    this.cards$ = this.store.select(selectCardsFilteredAndPaged);
    this.sortDirection$ = this.store.select(selectCardsSortDirection);
    this.sort$ = this.store.select(selectCardsSort);
    this.pageInfo$ = this.store.select(selectCardsPageInfo);
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

  onSort(sort: CardSort) {
    this.store.dispatch(changeCardsSort({ sort: sort }));
  }
}
