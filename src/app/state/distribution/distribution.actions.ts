import { createAction, props } from '@ngrx/store';
import { Distribution } from 'src/app/models/distribution.model';
import { StatusResponse } from 'src/app/models/status-response.model';

export const distributeCards = createAction(
  '[Distribution] Distribute cards',
  props<{ distribution: Distribution }>(),
);

export const distributeCardsSuccess = createAction(
  '[Distribution] Distribute cards success',
  props<{ response: StatusResponse }>(),
);

export const distributeCardsError = createAction(
  '[Distribution] Distribute cards error',
  props<{ error: string }>(),
);
