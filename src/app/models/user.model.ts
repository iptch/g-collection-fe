export interface User {
  status: string;
  user: {
    email: string;
    first_name: string;
    last_name: string;
    is_admin: boolean;
  };
  card_id: number;
  last_login: string;
}
