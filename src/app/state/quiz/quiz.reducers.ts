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
      loadingAnswer: false,
      loadingAnswerError: null,
      currentAnswerId: null,
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

  on(
    QuizActions.sendAnswer,
    (state, { answerId }): QuizState => ({
      ...state,
      currentQuestion: state.currentQuestion
        ? {
            ...state.currentQuestion,
            correctAnswerId: undefined,
          }
        : null,
      currentAnswerId: answerId,
      loadingAnswer: true,
      loadingAnswerError: null,
    }),
  ),

  on(
    QuizActions.sendAnswerSuccess,
    (state, { correctAnswerId }): QuizState => ({
      ...state,
      currentQuestion: state.currentQuestion
        ? {
            ...state.currentQuestion,
            correctAnswerId,
          }
        : null,
      loadingAnswer: false,
      loadingAnswerError: null,
    }),
  ),

  on(
    QuizActions.sendAnswerError,
    (state, { error }): QuizState => ({
      ...state,
      loadingAnswer: false,
      loadingAnswerError: error,
    }),
  ),
);
