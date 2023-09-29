import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CardState, cardAdapter } from './card.state';
import {
  selectProfile,
  selectProfileState,
} from '../profile/profile.selectors';
import { CardWithProfile, Card } from 'src/app/models/card.model';

export const selectCardState = createFeatureSelector<CardState>('card');

const { selectAll, selectEntities } = cardAdapter.getSelectors();

export const selectAllCards = createSelector(selectCardState, (state) =>
  selectAll(state),
);

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

export const selectCardsShowAll = createSelector(
  selectCardState,
  (cardState) => cardState.showAll,
);

export const selectCardsPageInfo = createSelector(
  selectCardState,
  (cardState) => ({
    pageSize: cardState.pageSize,
    pageIndex: cardState.pageIndex,
  }),
);
export const selectCardsSorted = createSelector(
  selectAllCards,
  selectCardState,
  (allCards, cardState) => {
    const getLastName = (obj: Card) => obj?.name?.split(' ')?.pop() || obj.name;
    const sortedCards = allCards.sort((a: Card, b: Card) => {
      switch (cardState.sort) {
        case 'acronym':
          return a.acronym > b.acronym ? 1 : -1;
        case 'name':
          return getLastName(a) > getLastName(b) ? 1 : -1;
        case 'doublicates':
          return a.quantity > b.quantity ? -1 : 1;
        case 'received':
          return a.last_received > b.last_received ? -1 : 1;
        default:
          return 0;
      }
    });

    if (!cardState.ascendingDirection) {
      return sortedCards.reverse();
    }

    return sortedCards;
  },
);

export const selectCardsSort = createSelector(
  selectCardState,
  (cardState) => cardState.sort,
);

export const selectCardsSortDirection = createSelector(
  selectCardState,
  (cardState) => cardState.ascendingDirection,
);

export const selectCardsFiltered = createSelector(
  selectCardsSorted,
  selectCardsShowAll,
  (allCards, showAll) => {
    if (showAll) {
      return allCards;
    } else {
      return allCards.filter((card) => card.quantity > 0);
    }
  },
);

export const selectCardsFilteredCount = createSelector(
  selectCardsFiltered,
  (cardsFiltered) => cardsFiltered.length,
);

export const selectCardsFilteredAndPaged = createSelector(
  selectCardsFiltered,
  selectCardsPageInfo,
  (cardsFiltered, pageInfo) => {
    const start = pageInfo.pageIndex * pageInfo.pageSize;
    const end = start + pageInfo.pageSize;
    return cardsFiltered.slice(start, end);
  },
);
