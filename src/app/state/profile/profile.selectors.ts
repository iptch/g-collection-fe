import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProfileState, profileAdapter } from './profile.state';

export const selectProfileState =
  createFeatureSelector<ProfileState>('profile');

const { selectAll } = profileAdapter.getSelectors();

export const selectAllProfiles = createSelector(selectProfileState, selectAll);

export const selectProfile = createSelector(
  selectAllProfiles,
  (profiles) => profiles[0] || null,
);

export const selectProfileLoading = createSelector(
  selectProfileState,
  (state) => state.loading,
);

export const selectProfileError = createSelector(
  selectProfileState,
  (state) => state.error,
);
