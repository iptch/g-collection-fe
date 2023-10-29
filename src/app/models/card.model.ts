export interface Card {
  id: number;
  name: string;
  acronym: string;
  job: string;
  start_at_ipt: string;
  wish_destination: string;
  wish_person: string;
  wish_skill: string;
  best_advice: string;
  image_url: string;
  quantity: number;
  last_received: string;
  otp_value: string;
}

export interface CardWithUser extends Card {
  giver: string;
}
