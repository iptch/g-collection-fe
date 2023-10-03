import { createReducer, on } from '@ngrx/store';
import { initialUserState, UserState } from './user.state';
import * as UserActions from './user.actions';

export const userReducer = createReducer(
  initialUserState,

  on(
    UserActions.loadUser,
    (state: UserState): UserState => ({
      ...state,
      loading: true,
      error: false,
    }),
  ),

  on(
    UserActions.loadUserSuccess,
    (state, { user }): UserState => ({
      ...state,
      user,
      loading: false,
      error: false,
    }),
  ),

  on(
    UserActions.loadUserError,
    (state): UserState => ({
      ...state,
      loading: false,
      error: true,
    }),
  ),
);
