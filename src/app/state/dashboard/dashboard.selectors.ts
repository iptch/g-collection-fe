import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DashboardState } from './dashboard.state';
import { selectUser } from '../user/user.selectors';

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
  selectUser,
  (dashboard, user) => {
    return (
      dashboard?.rankingList.find(
        (ranking) => ranking.userEmail === user?.user.email,
      )?.rank ?? 0
    );
  },
);

export const selectTotalUsers = createSelector(
  selectDashboard,
  (dashboard) => dashboard?.rankingList.length ?? 0,
);

export const selectTopRanking = createSelector(selectDashboard, (dashboard) =>
  dashboard?.rankingList ? dashboard.rankingList.slice(0, 10) : [],
);

export const selectDashboardProgress = createSelector(
  selectDashboard,
  (dashboard) => {
    if (!dashboard) {
      return 0;
    }
    return (dashboard.myUniqueCardsCount / dashboard.allCardsCount) * 100 || 0;
  },
);
