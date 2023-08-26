export interface Card {
  id: number;
  acronym: string;
  highlight: string;
  job: string;
  must_have: string;
  name: string;
  superpower: string;
  team: string;
  imageUrl?: string;
}

export interface Cards {
  results: Card[];
}
