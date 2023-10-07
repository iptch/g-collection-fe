import { Dashboard } from '../../models/dashboard.model';

export interface DashboardState {
  dashboard: Dashboard | null;
  loading: boolean;
  error: string | null;
  myRank: number;
}

export const initialDashboardState: DashboardState = {
  dashboard: null,
  loading: false,
  error: null,
  myRank: 0,
};
