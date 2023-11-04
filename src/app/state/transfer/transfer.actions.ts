import { createAction, props } from '@ngrx/store';
import { Code } from 'src/app/models/code.model';
import { StatusResponse } from 'src/app/models/status-response.model';

export const transferCard = createAction(
  '[Transfer] Transfer card',
  props<{ code: Code }>(),
);

export const transferCardSuccess = createAction(
  '[Transfer] Transfer card success',
  props<{
    cardId: number;
    response: StatusResponse;
  }>(),
);

export const transferCardError = createAction(
  '[Transfer] Transfer card error',
  props<{ error: string }>(),
);

export const resetTransferCode = createAction('[Transfer] Reset transfer code');

export const startScanner = createAction('[Transfer] Start scanner');

export const startScannerSuccess = createAction(
  '[Transfer] Start scanner success',
);

export const startScannerError = createAction(
  '[Transfer] Start scanner error',
  props<{ error: string }>(),
);
