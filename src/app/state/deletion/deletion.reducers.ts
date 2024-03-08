import { createReducer, on } from '@ngrx/store';
import { initialDeletionState, DeletionState } from './deletion.state';
import * as DeletionActions from './deletion.actions';

export const deletionReducer = createReducer(
  initialDeletionState,

  on(
    DeletionActions.deleteUser,
    (state, { email }): DeletionState => ({
      ...state,
      email,
      loading: true,
      error: null,
    }),
  ),

  on(
    DeletionActions.deleteUserSuccess,
    (state): DeletionState => ({
      ...state,
      email: null,
      loading: false,
      error: null,
    }),
  ),

  on(
    DeletionActions.deleteUserFailed,
    (state, { error }): DeletionState => ({
      ...state,
      loading: false,
      error,
    }),
  ),
);
