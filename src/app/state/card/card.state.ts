import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { Card } from 'src/app/models/card.model';

export interface CardState extends EntityState<Card> {
  loading: boolean;
  error: boolean;
}

export const cardAdapter = createEntityAdapter<Card>();

export const initialCardState: CardState = cardAdapter.getInitialState({
  loading: false,
  error: false,
});
