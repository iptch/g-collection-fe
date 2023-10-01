import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DistributionState } from './distribution.state';

export const selectDistributionState =
  createFeatureSelector<DistributionState>('distribution');

export const selectDistributionLoading = createSelector(
  selectDistributionState,
  (state) => state.loading,
);

export const selectDistributionError = createSelector(
  selectDistributionState,
  (state) => state.error,
);
