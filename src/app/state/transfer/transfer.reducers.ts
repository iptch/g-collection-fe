import { createReducer, on } from '@ngrx/store';
import { TransferState, initialTransferState } from './transfer.state';
import * as TransferActions from './transfer.actions';

export const transferReducer = createReducer(
  initialTransferState,

  on(
    TransferActions.transferCard,
    (state, { code }): TransferState => ({
      ...state,
      code,
      loading: true,
      error: null,
    }),
  ),

  on(
    TransferActions.transferCardSuccess,
    TransferActions.resetTransferCode,
    (): TransferState => initialTransferState,
  ),

  on(
    TransferActions.transferCardError,
    (state, { error }): TransferState => ({
      ...state,
      loading: false,
      error,
    }),
  ),
);
