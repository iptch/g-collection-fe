import { createAction, props } from '@ngrx/store';
import { StatusResponse } from 'src/app/models/status-response.model';

export const deleteUser = createAction(
  '[Deletion] Delete user',
  props<{ email: string }>(),
);

export const deleteUserSuccess = createAction(
  '[Deletion] Delete user success',
  props<{ response: StatusResponse }>(),
);

export const deleteUserFailed = createAction(
  '[Deletion] Delete user failed',
  props<{ error: string }>(),
);
