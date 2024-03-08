import { createFeatureSelector, createSelector } from '@ngrx/store';
import { cardAdapter, CardState } from './card.state';
import { Card, CardWithUser } from 'src/app/models/card.model';
import { CardSort } from 'src/app/models/card-sort.enum';
import { selectUser } from '../user/user.selectors';

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

export const selectCardWithUserById = (id: number) =>
  createSelector(
    selectCardById(id),
    selectUser,
    (card, user) =>
      ({
        ...card,
        giver: user?.user.email,
      }) as CardWithUser,
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

export const selectSearchTerm = createSelector(
  selectCardState,
  (cardState) => cardState.searchTerm,
);

export const selectCardsInSearch = createSelector(
  selectAllCards,
  selectSearchTerm,
  (allCards, searchTerm) => {
    if (searchTerm) {
      const trimmedSearchTerm = searchTerm.trim().toLowerCase();
      return allCards.filter(
        (card) =>
          card.name.toLowerCase().includes(trimmedSearchTerm) ||
          card.acronym.toLowerCase().includes(trimmedSearchTerm),
      );
    }
    return allCards;
  },
);

export const selectCardsSorted = createSelector(
  selectCardsInSearch,
  selectCardState,
  (allCards, cardState) => {
    const cardsCopy = [...allCards];
    cardsCopy.sort((a: Card, b: Card) => {
      switch (cardState.sort) {
        case CardSort.Acronym:
          return a.acronym > b.acronym ? 1 : -1;
        case CardSort.Name:
          return a.name > b.name ? 1 : -1;
        case CardSort.Duplicates:
          return a.quantity > b.quantity ? -1 : 1;
        case CardSort.Received:
          if (!a.last_received) return 1;
          if (!b.last_received) return -1;
          return b.last_received.localeCompare(a.last_received);
        case CardSort.Start:
          return b.start_at_ipt.localeCompare(a.start_at_ipt);
        default:
          return 0;
      }
    });

    if (!cardState.ascendingDirection) {
      return cardsCopy.reverse();
    }

    return cardsCopy;
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
