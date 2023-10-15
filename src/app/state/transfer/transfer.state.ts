import { Code } from 'src/app/models/code.model';

export interface TransferState {
  code: Code | null;
  loading: boolean;
  error: string | null;
}

export const initialTransferState: TransferState = {
  code: null,
  loading: false,
  error: null,
};
