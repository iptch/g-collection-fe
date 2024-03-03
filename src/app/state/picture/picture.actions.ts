import { createAction, props } from '@ngrx/store';

export const uploadPicture = createAction(
  '[Picture] Upload picture',
  props<{ file: File }>(),
);

export const uploadPictureSuccess = createAction(
  '[Picture] Upload picture success',
  props<{ image_url: string }>(),
);

export const uploadPictureFailed = createAction(
  '[Picture] Upload picture failed',
  props<{ error: string }>(),
);

export const getPicture = createAction('[Picture] Get picture');

export const getPictureSuccess = createAction(
  '[Picture] Get picture success',
  props<{ image_url: string }>(),
);

export const getPictureFailed = createAction(
  '[Picture] Get picture failed',
  props<{ error: string }>(),
);

export const resetImageUrl = createAction('[Picture] Reset image URL');
