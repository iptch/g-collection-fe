import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DashboardState } from './dashboard.state';
import { selectProfileUserPrincipalName } from '../profile/profile.selectors';

export const selectDashboardState =
  createFeatureSelector<DashboardState>('dashboard');

export const selectDashboard = createSelector(
  selectDashboardState,
  (state) => state.dashboard,
);

export const selectDashboardLoading = createSelector(
  selectDashboardState,
  (state) => state.loading,
);

export const selectDashboardError = createSelector(
  selectDashboardState,
  (state) => state.error,
);

export const selectMyRank = createSelector(
  selectDashboard,
  selectProfileUserPrincipalName,
  (dashboard, userEmail) => {
    return (
      dashboard?.rankingList.find((ranking) => ranking.userEmail === userEmail)
        ?.rank ?? 0
    );
  },
);
