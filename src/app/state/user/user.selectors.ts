import { UserState } from './user.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectUser = createSelector(
  selectUserState,
  (state) => state.user,
);

export const selectUserIsAdmin = createSelector(
  selectUser,
  (user) => user?.isAdmin,
);
