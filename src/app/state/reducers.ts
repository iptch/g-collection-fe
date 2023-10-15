import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './state';
import { cardReducer } from './card/card.reducers';
import { distributionReducer } from './distribution/distribution.reducers';
import { dashboardReducer } from './dashboard/dashboard.reducers';
import { userReducer } from './user/user.reducers';
import { transferReducer } from './transfer/transfer.reducers';

export const reducers: ActionReducerMap<AppState> = {
  user: userReducer,
  card: cardReducer,
  distribution: distributionReducer,
  dashboard: dashboardReducer,
  transfer: transferReducer,
};
