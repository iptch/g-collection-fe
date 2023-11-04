import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { CardSort } from 'src/app/models/card-sort.enum';
import { Card } from 'src/app/models/card.model';

export interface CardState extends EntityState<Card> {
  count: number;
  next: string | null;
  previous: string | null;
  loading: boolean;
  error: boolean;
  showAll: boolean;
  pageSize: number;
  pageIndex: number;
  sort: CardSort;
  ascendingDirection: boolean;
  searchTerm: string;
}

export const cardAdapter = createEntityAdapter<Card>();

export const initialCardState: CardState = cardAdapter.getInitialState({
  count: 0,
  next: null,
  previous: null,
  loading: false,
  error: false,
  showAll: true,
  pageSize: 12,
  pageIndex: 0,
  sort: CardSort.Received,
  ascendingDirection: true,
  searchTerm: '',
});
