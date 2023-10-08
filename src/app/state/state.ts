import { CardState } from './card/card.state';
import { DistributionState } from './distribution/distribution.state';
import { DashboardState } from './dashboard/dashboard.state';
import { UserState } from './user/user.state';

export interface AppState {
  readonly user: UserState;
  readonly card: CardState;
  readonly distribution: DistributionState;
  readonly dashboard: DashboardState;
}
