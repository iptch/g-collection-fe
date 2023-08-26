import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CardState, cardAdapter } from './card.state';

export const selectCardState = createFeatureSelector<CardState>('card');

const { selectAll, selectEntities } = cardAdapter.getSelectors();

export const selectAllCards = createSelector(selectCardState, selectAll);

export const selectCardEntities = createSelector(selectCardState, (state) =>
  selectEntities(state),
);

export const selectCardById = (id: number) =>
  createSelector(selectCardEntities, (cards) => cards[id]);

export const selectCardLoading = createSelector(
  selectCardState,
  (state) => state.loading,
);

export const selectCardError = createSelector(
  selectCardState,
  (state) => state.error,
);
