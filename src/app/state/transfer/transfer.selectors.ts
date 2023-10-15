import { TransferState } from './transfer.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectTransferState =
  createFeatureSelector<TransferState>('transfer');

export const selectTransferCode = createSelector(
  selectTransferState,
  (state) => state.code,
);

export const selectTransferLoading = createSelector(
  selectTransferState,
  (state) => state.loading,
);

export const selectTransferError = createSelector(
  selectTransferState,
  (state) => state.error,
);
