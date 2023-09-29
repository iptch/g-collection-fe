import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CardState, cardAdapter } from './card.state';
import {
  selectProfile,
  selectProfileState,
} from '../profile/profile.selectors';
import { CardWithProfile } from 'src/app/models/card.model';

export const selectCardState = createFeatureSelector<CardState>('card');

const { selectAll, selectEntities } = cardAdapter.getSelectors();

export const selectAllCards = createSelector(selectCardState, (state) =>
  selectAll(state),
);

export const selectOwnedCards = createSelector(selectAllCards, (cards) => {
  return cards.filter((card) => card.owned > 0);
});

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

export const selectCardWithProfileById = (id: number) =>
  createSelector(
    selectCardById(id),
    selectProfile,
    (card, profile) =>
      ({
        ...card,
        giver: profile?.userPrincipalName,
      }) as CardWithProfile,
  );

export const selectCardWithProfileLoading = createSelector(
  selectCardState,
  selectProfileState,
  (cardState, profileState) =>
    (cardState.loading || profileState.loading) &&
    !(cardState.error || profileState.error),
);

export const selectCardWithProfileError = createSelector(
  selectCardState,
  selectProfileState,
  (cardState, profileState) => cardState.error || profileState.error,
);
