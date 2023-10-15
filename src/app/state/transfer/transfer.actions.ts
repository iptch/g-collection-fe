import { createAction, props } from '@ngrx/store';
import { Code } from 'src/app/models/code.model';
import { StatusResponse } from 'src/app/models/status-response.model';

export const transferCard = createAction(
  '[Cards] Transfer card',
  props<{ code: Code }>(),
);

export const transferCardSuccess = createAction(
  '[Cards] Transfer card success',
  props<{
    cardId: number;
    response: StatusResponse;
  }>(),
);

export const transferCardError = createAction(
  '[Cards] Transfer card error',
  props<{ error: string }>(),
);

export const resetTransferCode = createAction('[Cards] Reset transfer code');
