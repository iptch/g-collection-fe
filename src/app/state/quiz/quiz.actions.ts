import { createAction, props } from '@ngrx/store';
import {
  Answer,
  AnswerRequest,
  Question,
  QuestionRequest,
} from 'src/app/models/quiz.model';

export const fetchQuestion = createAction(
  '[Quiz] Fetch question',
  props<{ questionRequest: QuestionRequest }>(),
);

export const fetchQuestionSuccess = createAction(
  '[Quiz] Fetch question success',
  props<{ question: Question }>(),
);

export const fetchQuestionError = createAction(
  '[Quiz] Fetch question error',
  props<{ error: string }>(),
);

export const fetchAnswer = createAction(
  '[Quiz] Fetch answer',
  props<{ answerRequest: AnswerRequest }>(),
);

export const fetchAnswerSuccess = createAction(
  '[Quiz] Fetch answer success',
  props<{ answer: Answer }>(),
);

export const fetchAnswerError = createAction(
  '[Quiz] Fetch answer error',
  props<{ error: string }>(),
);
