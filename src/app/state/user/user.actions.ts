import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';

export const initUser = createAction('[User] Init user');
export const initUserSuccess = createAction(
  '[User] Init user success',
  props<{ user: User }>(),
);

export const initUserFailed = createAction(
  '[User] Init user failed',
  props<{ error: string }>(),
);
