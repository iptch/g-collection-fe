import { PictureState } from './picture.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectPictureState =
  createFeatureSelector<PictureState>('picture');

export const selectPicture = createSelector(
  selectPictureState,
  (state) => state.image_url,
);

export const selectPictureLoading = createSelector(
  selectPictureState,
  (state) => state.loading,
);

export const selectPictureError = createSelector(
  selectPictureState,
  (state) => state.error,
);
