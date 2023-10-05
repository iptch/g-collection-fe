import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DashboardState } from './dashboard.state';

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
