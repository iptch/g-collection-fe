import { createReducer, on } from '@ngrx/store';
import {
  DistributionState,
  initialDistributionState,
} from './distribution.state';
import * as DistributionActions from './distribution.actions';

export const distributionReducer = createReducer(
  initialDistributionState,

  on(
    DistributionActions.distributeCards,
    (state: DistributionState): DistributionState => ({
      ...state,
      loading: true,
      error: false,
    }),
  ),

  on(
    DistributionActions.distributeCardsSuccess,
    (state): DistributionState => ({
      ...state,
      loading: false,
      error: false,
    }),
  ),

  on(
    DistributionActions.distributeCardsError,
    (state): DistributionState => ({
      ...state,
      loading: false,
      error: true,
    }),
  ),
);
