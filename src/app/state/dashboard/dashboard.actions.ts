import { createAction, props } from '@ngrx/store';
import { Dashboard } from '../../models/dashboard.model';

export const loadDashboard = createAction('[Dashboard] Load Dashboard');

export const loadDashboardSuccess = createAction(
  '[Dashboard] Load Dashboard Success',
  props<{ dashboard: Dashboard }>(),
);

export const loadDashboardError = createAction(
  '[Dashboard] Load Dashboard Error',
);
