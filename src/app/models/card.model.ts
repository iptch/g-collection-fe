export interface Card {
  id: number;
  acronym: string;
  highlight: string;
  job: string;
  must_have: string;
  name: string;
  superpower: string;
  team: string;
  image_url: string;
}

export interface CardWithProfile extends Card {
  userPrincipalName: string;
}

export interface Cards {
  results: Card[];
}
