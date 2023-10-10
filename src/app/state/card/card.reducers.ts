import { createReducer, on } from '@ngrx/store';
import { cardAdapter, CardState, initialCardState } from './card.state';
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
    const entityState = cardAdapter.upsertMany(cards, state);

    return {
      ...entityState,
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
    return { ...state, showAll, pageIndex: initialCardState.pageIndex };
  }),

  on(
    CardActions.changeCardsPage,
    (state, { pageIndex, pageSize }): CardState => {
      return { ...state, pageIndex, pageSize };
    },
  ),

  on(CardActions.changeCardsSort, (state, { sort }): CardState => {
    return { ...state, sort, pageIndex: initialCardState.pageIndex };
  }),

  on(CardActions.changeCardsSearchTerm, (state, { searchTerm }): CardState => {
    return { ...state, searchTerm, pageIndex: initialCardState.pageIndex };
  }),

  on(CardActions.changeCardsSortDirection, (state): CardState => {
    return {
      ...state,
      ascendingDirection: !state.ascendingDirection,
      pageIndex: initialCardState.pageIndex,
    };
  }),
);
