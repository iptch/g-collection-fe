import { createAction, props } from '@ngrx/store';
import { Profile } from 'src/app/models/profile.model';

export const loadProfile = createAction('[Profile] Load profile');

export const loadProfileSuccess = createAction(
  '[Profile] Load profile success',
  props<{ profile: Profile }>(),
);

export const loadProfileError = createAction('[Profile] Load profile error');
