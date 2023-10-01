export interface DistributionState {
  loading: boolean;
  error: boolean;
}

export const initialDistributionState: DistributionState = {
  loading: false,
  error: false,
};
