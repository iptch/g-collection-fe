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
  quantity: number;
  last_received: string;
  otp_value: string;
}

export interface CardWithUser extends Card {
  giver: string;
}
