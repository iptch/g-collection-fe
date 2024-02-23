import { QuizQuestion } from 'src/app/models/quiz.model';

export interface QuizState {
  currentQuestion: QuizQuestion | null;
  loadingQuestion: boolean;
  loadingQuestionError: string | null;
}

export const initialQuizState: QuizState = {
  currentQuestion: null,
  loadingQuestion: false,
  loadingQuestionError: null,
};
