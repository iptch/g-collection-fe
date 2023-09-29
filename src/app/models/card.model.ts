export interface Card {
  id: number;
  acronym: string;
  highlight: string;
  job: string;
  must_have: string;
  name: string;
  quantity: number;
  superpower: string;
  team: string;
  image_url: string;
  quantity: number;
}

export interface CardWithProfile extends Card {
  giver: string;
}

export interface Cards {
  results: Card[];
  count: number;
  next: string | null;
  previous: string | null;
}
