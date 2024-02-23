import { QuizQuestion } from 'src/app/models/quiz.model';

export interface QuizState {
  currentQuestion: QuizQuestion | null;
  currentAnswerId: string | null;
  loadingQuestion: boolean;
  loadingQuestionError: string | null;
  loadingAnswer: boolean;
  loadingAnswerError: string | null;
}

export const initialQuizState: QuizState = {
  currentQuestion: null,
  currentAnswerId: null,
  loadingQuestion: false,
  loadingQuestionError: null,
  loadingAnswer: false,
  loadingAnswerError: null,
};
