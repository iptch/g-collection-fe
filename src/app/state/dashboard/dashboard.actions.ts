import { createAction, props } from '@ngrx/store';
import { Dashboard } from '../../models/dashboard.model';

export const loadDashboard = createAction('[Dashboard] Load dashboard');

export const loadDashboardSuccess = createAction(
  '[Dashboard] Load dashboard success',
  props<{ dashboard: Dashboard }>(),
);

export const loadDashboardError = createAction(
  '[Dashboard] Load dashboard error',
  props<{ error: string }>(),
);
