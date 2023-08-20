import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { Profile } from 'src/app/models/profile.model';

export interface ProfileState extends EntityState<Profile> {
  loading: boolean;
  error: boolean;
}

export const profileAdapter = createEntityAdapter<Profile>();

export const initialProfileState: ProfileState = profileAdapter.getInitialState(
  {
    loading: false,
    error: false,
  },
);
