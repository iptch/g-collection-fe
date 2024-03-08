import { createReducer, on } from '@ngrx/store';
import { initialUserState, UserState } from './user.state';
import * as UserActions from './user.actions';
import { modifyCardSuccess } from '../card/card.actions';

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

  on(
    modifyCardSuccess,
    (state, { card }): UserState => ({
      ...state,
      user: state.user
        ? {
            ...state.user,
            card_id: card.id,
          }
        : null,
      loading: false,
      error: null,
    }),
  ),
);
