import { Profile } from 'src/app/models/profile.model';

export interface ProfileState {
  profile: Profile | null;
  loading: boolean;
  error: boolean;
}

export const initialProfileState: ProfileState = {
  profile: null,
  loading: false,
  error: false,
};
