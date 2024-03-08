import { ActionReducerMap } from '@ngrx/store';
import { cardReducer } from './card/card.reducers';
import { dashboardReducer } from './dashboard/dashboard.reducers';
import { distributionReducer } from './distribution/distribution.reducers';
import { quizReducer } from './quiz/quiz.reducers';
import { AppState } from './state';
import { transferReducer } from './transfer/transfer.reducers';
import { userReducer } from './user/user.reducers';
import { pictureReducer } from './picture/picture.reducers';
import { deletionReducer } from './deletion/deletion.reducers';

export const reducers: ActionReducerMap<AppState> = {
  user: userReducer,
  card: cardReducer,
  distribution: distributionReducer,
  dashboard: dashboardReducer,
  transfer: transferReducer,
  quiz: quizReducer,
  picture: pictureReducer,
  deletion: deletionReducer,
};
