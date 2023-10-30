export interface Dashboard {
  myCardsCount: number;
  totalCardQuantity: number;
  myUniqueCardsCount: number;
  allCardsCount: number;
  duplicateCardsCount: number;
  rankingList: Ranking[];
}

export interface Ranking {
  rank: number;
  uniqueCardsCount: number;
  displayName: string;
  userEmail: string;
}
