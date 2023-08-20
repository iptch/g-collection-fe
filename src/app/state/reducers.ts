import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './state';
import { profileReducer } from './profile/profile.reducers';

export const reducers: ActionReducerMap<AppState> = {
  profile: profileReducer,
};
