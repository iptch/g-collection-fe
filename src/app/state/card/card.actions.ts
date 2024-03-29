import { createAction, props } from '@ngrx/store';
import { CardSort } from 'src/app/models/card-sort.enum';
import { Card, UserCard } from 'src/app/models/card.model';

export const loadCards = createAction('[Cards] Load cards');

export const loadCardsSuccess = createAction(
  '[Cards] Load cards success',
  props<{ cards: Card[] }>(),
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

export const changeCardsSearchTerm = createAction(
  '[Cards] Change Search Term',
  props<{ searchTerm: string }>(),
);

export const changeCardsPage = createAction(
  '[Cards] Change Page',
  props<{ pageIndex: number; pageSize: number }>(),
);

export const changeCardsSort = createAction(
  '[Cards] Change Sort',
  props<{ sort: CardSort }>(),
);

export const changeCardsSortDirection = createAction(
  '[Cards] Change Sort Direction',
);

export const modifyCard = createAction(
  '[Cards] Modify Card',
  props<{
    userCard: UserCard;
    dialogId?: string;
  }>(),
);

export const modifyCardSuccess = createAction(
  '[Cards] Modify Card Success',
  props<{ card: Card }>(),
);

export const modifyCardError = createAction(
  '[Cards] Modify Card error',
  props<{ error: string }>(),
);
