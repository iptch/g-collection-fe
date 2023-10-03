export interface Dashboard {
  myCardsCount: number;
  myUniqueCardsCount: number;
  allCardsCount: number;
  duplicateCardsCount: number;
  rankingList: Ranking[];
}

export interface Ranking {
  rank: number;
  cardsCount: number;
  displayName: string;
  userEmail: string;
}