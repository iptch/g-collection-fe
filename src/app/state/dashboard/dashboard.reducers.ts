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
      error: null,
    }),
  ),

  on(
    DashboardActions.loadDashboardSuccess,
    (state, { dashboard }): DashboardState => ({
      ...state,
      dashboard,
      loading: false,
      error: null,
    }),
  ),

  on(
    DashboardActions.loadDashboardError,
    (state, { error }): DashboardState => ({
      ...state,
      loading: false,
      error: error,
    }),
  ),
);
