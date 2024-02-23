import { createAction, props } from '@ngrx/store';
import { QuizQuestion } from 'src/app/models/quiz.model';

export const getQuestion = createAction('[Dashboard] Load dashboard');

export const getQuestionSuccess = createAction(
  '[Quiz] Get question success',
  props<{ question: QuizQuestion }>(),
);

export const getQuestionError = createAction(
  '[Quiz] Get question error',
  props<{ error: string }>(),
);
