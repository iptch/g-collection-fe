import { createReducer, on } from '@ngrx/store';
import { ProfileState, initialProfileState } from './profile.state';
import * as ProfileActions from './profile.actions';

export const profileReducer = createReducer(
  initialProfileState,

  on(
    ProfileActions.loadProfile,
    (state: ProfileState): ProfileState => ({
      ...state,
      loading: true,
      error: false,
    }),
  ),

  on(
    ProfileActions.loadProfileSuccess,
    (state, { profile }): ProfileState => ({
      ...state,
      profile,
      loading: false,
      error: false,
    }),
  ),

  on(
    ProfileActions.loadProfileError,
    (state): ProfileState => ({
      ...state,
      loading: false,
      error: true,
    }),
  ),
);
