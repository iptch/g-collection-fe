import { createReducer, on } from '@ngrx/store';
import {
  ProfileState,
  initialProfileState,
  profileAdapter,
} from './profile.state';
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

  on(ProfileActions.loadProfileSuccess, (state, { profile }): ProfileState => {
    const entityState = profileAdapter.setOne(profile, state);

    return {
      ...entityState,
      loading: false,
      error: false,
    };
  }),

  on(
    ProfileActions.loadProfileError,
    (state): ProfileState => ({
      ...state,
      loading: false,
      error: true,
    }),
  ),
);
