import { Dashboard } from '../../models/dashboard.model';

export interface DashboardState {
  dashboard: Dashboard | null;
  loading: boolean;
  error: boolean;
}

export const initialDashboardState: DashboardState = {
  dashboard: null,
  loading: false,
  error: false,
};