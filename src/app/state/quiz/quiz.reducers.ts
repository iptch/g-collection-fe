import { createReducer, on } from '@ngrx/store';
import * as QuizActions from './quiz.actions';
import { QuizState, initialQuizState } from './quiz.state';

export const quizReducer = createReducer(
  initialQuizState,

  on(
    QuizActions.getQuestion,
    (state): QuizState => ({
      ...state,
      loadingQuestion: true,
      loadingQuestionError: null,
    }),
  ),

  on(
    QuizActions.getQuestionSuccess,
    (state, { question }): QuizState => ({
      ...state,
      currentQuestion: question,
      loadingQuestion: false,
      loadingQuestionError: null,
    }),
  ),

  on(
    QuizActions.getQuestionError,
    (state, { error }): QuizState => ({
      ...state,
      loadingQuestion: false,
      loadingQuestionError: error,
    }),
  ),
);
