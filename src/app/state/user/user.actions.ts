import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';

export const loadUser = createAction('[User] Load user');

export const loadUserSuccess = createAction(
  '[User] Load user success',
  props<{ user: User }>(),
);

export const loadUserError = createAction('[User] Load user error');
