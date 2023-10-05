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
      error: null,
    }),
  ),

  on(
    UserActions.initUserSuccess,
    (state, { user }): UserState => ({
      ...state,
      user,
      loading: false,
      error: null,
    }),
  ),

  on(
    UserActions.initUserFailed,
    (state, { error }): UserState => ({
      ...state,
      loading: false,
      error: error,
    }),
  ),
);
