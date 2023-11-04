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
    }),
  ),

  on(
    DistributionActions.distributeCardsSuccess,
    DistributionActions.distributeCardsError,
    (state): DistributionState => ({
      ...state,
      loading: false,
    }),
  ),
);
