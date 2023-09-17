import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { Card } from 'src/app/models/card.model';

export interface CardState extends EntityState<Card> {
  count: number;
  next: string | null;
  previous: string | null;
  loading: boolean;
  error: boolean;
}

export const cardAdapter = createEntityAdapter<Card>();

export const initialCardState: CardState = cardAdapter.getInitialState({
  count: 0,
  next: null,
  previous: null,
  loading: false,
  error: false,
});
