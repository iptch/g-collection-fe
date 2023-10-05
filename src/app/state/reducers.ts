import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './state';
import { profileReducer } from './profile/profile.reducers';
import { cardReducer } from './card/card.reducers';
import { distributionReducer } from './distribution/distribution.reducers';
import { dashboardReducer } from './dashboard/dashboard.reducers';

export const reducers: ActionReducerMap<AppState> = {
  profile: profileReducer,
  card: cardReducer,
  distribution: distributionReducer,
  dashboard: dashboardReducer,
};
