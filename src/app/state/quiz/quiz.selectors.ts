import { createFeatureSelector, createSelector } from '@ngrx/store';
import { QuizState } from './quiz.state';

export const selectQuizState = createFeatureSelector<QuizState>('quiz');

export const selectCurrentQuestion = createSelector(
  selectQuizState,
  (state) => state.currentQuestion,
);

export const selectLoadingQuestion = createSelector(
  selectQuizState,
  (state) => state.loadingQuestion,
);

export const selectLoadingQuestionError = createSelector(
  selectQuizState,
  (state) => state.loadingQuestionError,
);

export const selectCurrentAnswerId = createSelector(
  selectQuizState,
  (state) => state.currentAnswerId,
);

export const selectLoadingAnswer = createSelector(
  selectQuizState,
  (state) => state.loadingAnswer,
);

export const selectLoadingAnswerError = createSelector(
  selectQuizState,
  (state) => state.loadingAnswerError,
);
