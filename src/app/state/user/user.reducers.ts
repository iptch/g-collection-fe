import { createReducer, on } from '@ngrx/store';
import { initialUserState, UserState } from './user.state';
import * as UserActions from './user.actions';

export const userReducer = createReducer(
  initialUserState,

  on(
    UserActions.initUser,
    (state: UserState): UserState => ({
      ...state,
      loading: true,
      error: false,
    }),
  ),

  on(
    UserActions.initUserSuccess,
    (state, { user }): UserState => ({
      ...state,
      user,
      loading: false,
      error: false,
    }),
  ),

  on(
    UserActions.initUserFailed,
    (state: UserState): UserState => ({
      ...state,
      loading: false,
      error: true,
    }),
  ),
);
