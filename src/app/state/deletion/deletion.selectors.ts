import { DeletionState } from './deletion.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectDeletionState =
  createFeatureSelector<DeletionState>('deletion');

export const selectDeletionEmail = createSelector(
  selectDeletionState,
  (state) => state.email,
);

export const selectDeletionLoading = createSelector(
  selectDeletionState,
  (state) => state.loading,
);
