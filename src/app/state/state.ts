import { ProfileState } from './profile/profile.state';

export interface AppState {
  readonly profile: ProfileState;
}
