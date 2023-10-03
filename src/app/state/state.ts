import { CardState } from './card/card.state';
import { DistributionState } from './distribution/distribution.state';
import { ProfileState } from './profile/profile.state';
import { DashboardState } from './dashboard/dashboard.state';
import { UserState } from './user/user.state';

export interface AppState {
  readonly profile: ProfileState;
  readonly card: CardState;
  readonly distribution: DistributionState;
  readonly dashboard: DashboardState;
  readonly user: UserState;
}
