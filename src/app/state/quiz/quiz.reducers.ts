import { createReducer, on } from '@ngrx/store';
import * as QuizActions from './quiz.actions';
import { QuizState, initialQuizState } from './quiz.state';

export const quizReducer = createReducer(
  initialQuizState,

  on(
    QuizActions.fetchQuestion,
    (state): QuizState => ({
      ...state,
      question: null,
      answer: null,
      loadingQuestion: true,
      loadingQuestionError: null,
      loadingAnswer: false,
      loadingAnswerError: null,
    }),
  ),

  on(
    QuizActions.fetchQuestionSuccess,
    (state, { question }): QuizState => ({
      ...state,
      question,
      loadingQuestion: false,
      loadingQuestionError: null,
    }),
  ),

  on(
    QuizActions.fetchQuestionError,
    (state, { error }): QuizState => ({
      ...state,
      loadingQuestion: false,
      loadingQuestionError: error,
    }),
  ),

  on(
    QuizActions.fetchAnswer,
    (state): QuizState => ({
      ...state,
      loadingAnswer: true,
      loadingAnswerError: null,
    }),
  ),

  on(
    QuizActions.fetchAnswerSuccess,
    (state, { answer }): QuizState => ({
      ...state,
      answer,
      loadingAnswer: false,
      loadingAnswerError: null,
    }),
  ),

  on(
    QuizActions.fetchAnswerError,
    (state, { error }): QuizState => ({
      ...state,
      loadingAnswer: false,
      loadingAnswerError: error,
    }),
  ),

  on(
    QuizActions.setPersonInQuestion,
    (state, { personInQuestion }): QuizState => ({
      ...state,
      personInQuestion,
    }),
  ),
);
