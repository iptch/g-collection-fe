import { CardState } from './card/card.state';
import { ProfileState } from './profile/profile.state';

export interface AppState {
  readonly profile: ProfileState;
  readonly card: CardState;
}
