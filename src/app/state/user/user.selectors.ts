import { UserState } from './user.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectUser = createSelector(
  selectUserState,
  (state) => state.user,
);

export const selectUserLoading = createSelector(
  selectUserState,
  (state) => state.loading,
);

export const selectUserError = createSelector(
  selectUserState,
  (state) => state.error,
);

export const selectUserIsAdmin = createSelector(
  selectUser,
  (user) => user?.user?.is_admin ?? null,
);

export const selectUserStatus = createSelector(
  selectUser,
  (user) => user?.status,
);
