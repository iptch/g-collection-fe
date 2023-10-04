export interface User {
  status: string;
  user: {
    email: string;
    first_name: string;
    last_name: string;
    is_admin: boolean;
  };
  last_login: string;
}
