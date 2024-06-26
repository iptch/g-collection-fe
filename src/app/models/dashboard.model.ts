export interface Dashboard {
  myCardsCount: number;
  totalCardQuantity: number;
  myUniqueCardsCount: number;
  allCardsCount: number;
  duplicateCardsCount: number;
  rankingCards: Ranking[];
  rankingQuiz: Ranking[];
  lastDistribution: string;
}

export interface Ranking {
  rank: number;
  uniqueCardsCount: number;
  displayName: string;
  userEmail: string;
  quizScore: number;
}
