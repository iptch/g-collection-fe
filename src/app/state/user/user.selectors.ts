import { UserState } from './user.state';
import { createFeatureSelector } from '@ngrx/store';

export const selectUserState = createFeatureSelector<UserState>('user');
