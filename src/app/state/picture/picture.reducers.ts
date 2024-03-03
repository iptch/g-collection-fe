import { createReducer, on } from '@ngrx/store';
import { initialPictureState, PictureState } from './picture.state';
import * as PictureActions from './picture.actions';

export const pictureReducer = createReducer(
  initialPictureState,

  on(
    PictureActions.getPicture,
    PictureActions.uploadPicture,
    (state: PictureState): PictureState => ({
      ...state,
      loading: true,
      error: null,
    }),
  ),

  on(
    PictureActions.getPictureSuccess,
    PictureActions.uploadPictureSuccess,
    (state, { image_url }): PictureState => {
      // Add timestamp to URL so that the browser reloads the image
      const url = new URL(image_url);
      url.searchParams.append('timestamp', Date.now().toString());
      return {
        ...state,
        image_url: url.toString(),
        loading: false,
        error: null,
      };
    },
  ),

  on(
    PictureActions.getPictureFailed,
    PictureActions.uploadPictureFailed,
    (state, { error }): PictureState => ({
      ...state,
      loading: false,
      error: error,
    }),
  ),

  on(
    PictureActions.setImageUrl,
    (state, { image_url }): PictureState => ({
      ...state,
      image_url,
    }),
  ),
);