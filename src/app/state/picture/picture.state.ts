export interface PictureState {
  image_url: string | null;
  loading: boolean;
  error: string | null;
}

export const initialPictureState: PictureState = {
  image_url: null,
  loading: false,
  error: null,
};
