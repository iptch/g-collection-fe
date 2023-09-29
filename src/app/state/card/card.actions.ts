import { createAction, props } from '@ngrx/store';
import { Card, Cards } from 'src/app/models/card.model';

export const loadCards = createAction('[Cards] Load cards');

export const loadCardsSuccess = createAction(
  '[Cards] Load cards success',
  props<{ cards: Cards }>(),
);

export const loadCardsError = createAction('[Cards] Load cards error');

export const loadCardById = createAction(
  '[Cards] Load card by id',
  props<{ id: number }>(),
);

export const loadCardByIdSuccess = createAction(
  '[Cards] Load card by id success',
  props<{ card: Card }>(),
);

export const loadCardByIdError = createAction('[Cards] Load card by id error');

export const changeCardsFilter = createAction(
  '[Cards] Change Filter',
  props<{ showAll: boolean }>(),
);

export const changeCardsPage = createAction(
  '[Cards] Change Page',
  props<{ pageIndex: number; pageSize: number }>(),
);
