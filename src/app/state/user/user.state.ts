import { User } from '../../models/user.model';

export interface UserState {
  user: User | null;
  loading: boolean;
  error: boolean;
}

export const initialUserState: UserState = {
  user: null,
  loading: false,
  error: false,
};
