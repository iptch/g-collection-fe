import { createReducer, on } from '@ngrx/store';
import {
  ProfileState,
  initialProfileState,
  profileAdapter,
} from './profile.state';
import {
  loadProfile,
  loadProfileError,
  loadProfileSuccess,
} from './profile.actions';

export const profileReducer = createReducer(
  initialProfileState,

  on(
    loadProfile,
    (state: ProfileState): ProfileState => ({
      ...state,
      loading: true,
      error: false,
    }),
  ),

  on(loadProfileSuccess, (state, { profile }): ProfileState => {
    const entityState = profileAdapter.setOne(profile, state);

    return {
      ...entityState,
      loading: false,
      error: false,
    };
  }),

  on(
    loadProfileError,
    (state): ProfileState => ({
      ...state,
      loading: false,
      error: true,
    }),
  ),
);
