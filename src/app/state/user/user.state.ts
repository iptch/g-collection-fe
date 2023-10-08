import { User } from '../../models/user.model';

export interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export const initialUserState: UserState = {
  user: null,
  loading: true,
  error: null,
};
