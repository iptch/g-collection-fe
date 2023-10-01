import { createReducer, on } from '@ngrx/store';
import { CardState, cardAdapter, initialCardState } from './card.state';
import * as CardActions from './card.actions';

export const cardReducer = createReducer(
  initialCardState,

  on(
    CardActions.loadCards,
    CardActions.loadCardById,
    (state: CardState): CardState => ({
      ...state,
      loading: true,
      error: false,
    }),
  ),

  on(
    CardActions.loadCardsError,
    CardActions.loadCardByIdError,
    (state): CardState => ({
      ...state,
      loading: false,
      error: true,
    }),
  ),

  on(CardActions.loadCardsSuccess, (state, { cards }): CardState => {
    const entityState = cardAdapter.upsertMany(cards.results, state);

    return {
      ...entityState,
      count: cards.count,
      next: cards.next,
      previous: cards.previous,
      loading: false,
      error: false,
    };
  }),

  on(CardActions.loadCardByIdSuccess, (state, { card }): CardState => {
    const entityState = cardAdapter.upsertOne(card, state);

    return {
      ...entityState,
      loading: false,
      error: false,
    };
  }),

  on(CardActions.changeCardsFilter, (state, { showAll }): CardState => {
    return { ...state, showAll };
  }),

  on(
    CardActions.changeCardsPage,
    (state, { pageIndex, pageSize }): CardState => {
      return { ...state, pageIndex, pageSize };
    },
  ),

  on(CardActions.changeCardsSort, (state, { sort }): CardState => {
    return { ...state, sort };
  }),

  on(CardActions.changeCardsSortDirection, (state): CardState => {
    return { ...state, ascendingDirection: !state.ascendingDirection };
  }),
);
