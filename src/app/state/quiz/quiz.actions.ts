import { createAction, props } from '@ngrx/store';
import { QuizQuestion } from 'src/app/models/quiz.model';

export const getQuestion = createAction('[Quiz] Get question');

export const getQuestionSuccess = createAction(
  '[Quiz] Get question success',
  props<{ question: QuizQuestion }>(),
);

export const getQuestionError = createAction(
  '[Quiz] Get question error',
  props<{ error: string }>(),
);

export const sendAnswer = createAction(
  '[Quiz] Send answer',
  props<{ answerId: string }>(),
);

export const sendAnswerSuccess = createAction(
  '[Quiz] Send answer success',
  props<{ correctAnswerId: string }>(),
);

export const sendAnswerError = createAction(
  '[Quiz] Send answer error',
  props<{ error: string }>(),
);
