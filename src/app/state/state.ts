import { CardState } from './card/card.state';
import { DashboardState } from './dashboard/dashboard.state';
import { DistributionState } from './distribution/distribution.state';
import { PictureState } from './picture/picture.state';
import { QuizState } from './quiz/quiz.state';
import { TransferState } from './transfer/transfer.state';
import { UserState } from './user/user.state';

export interface AppState {
  readonly user: UserState;
  readonly card: CardState;
  readonly distribution: DistributionState;
  readonly dashboard: DashboardState;
  readonly transfer: TransferState;
  readonly quiz: QuizState;
  readonly picture: PictureState;
}
