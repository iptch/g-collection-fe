import { createFeatureSelector, createSelector } from '@ngrx/store';
import { QuizState } from './quiz.state';

export const selectQuizState = createFeatureSelector<QuizState>('quiz');

export const selectQuestion = createSelector(
  selectQuizState,
  (state) => state.question,
);

export const selectLoadingQuestion = createSelector(
  selectQuizState,
  (state) => state.loadingQuestion,
);

export const selectLoadingQuestionError = createSelector(
  selectQuizState,
  (state) => state.loadingQuestionError,
);

export const selectAnswer = createSelector(
  selectQuizState,
  (state) => state.answer,
);

export const selectLoadingAnswer = createSelector(
  selectQuizState,
  (state) => state.loadingAnswer,
);

export const selectLoadingAnswerError = createSelector(
  selectQuizState,
  (state) => state.loadingAnswerError,
);
