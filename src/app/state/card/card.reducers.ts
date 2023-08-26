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
);
