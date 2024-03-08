export interface DeletionState {
  email: string | null;
  loading: boolean;
  error: string | null;
}

export const initialDeletionState: DeletionState = {
  email: null,
  loading: false,
  error: null,
};
