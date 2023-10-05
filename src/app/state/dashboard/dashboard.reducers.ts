import { createReducer, on } from '@ngrx/store';
import { DashboardState, initialDashboardState } from './dashboard.state';
import * as DashboardActions from './dashboard.actions';

export const dashboardReducer = createReducer(
  initialDashboardState,

  on(
    DashboardActions.loadDashboard,
    (state): DashboardState => ({
      ...state,
      loading: true,
      error: false,
    }),
  ),

  on(
    DashboardActions.loadDashboardSuccess,
    (state, { dashboard }): DashboardState => ({
      ...state,
      dashboard,
      loading: false,
      error: false,
    }),
  ),

  on(
    DashboardActions.loadDashboardError,
    (state): DashboardState => ({
      ...state,
      loading: false,
      error: true,
    }),
  ),
);
