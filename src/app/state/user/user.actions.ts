import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';

export const initUser = createAction('[User] Init User');
export const initUserSuccess = createAction(
  '[User] Init User Success',
  props<{ user: User }>(),
);

export const initUserFailed = createAction(
  '[User] Init User Failed',
  props<{ error: string }>(),
);
