import { Answer, Question } from 'src/app/models/quiz.model';

export interface QuizState {
  question: Question | null;
  answer: Answer | null;
  loadingQuestion: boolean;
  loadingQuestionError: string | null;
  loadingAnswer: boolean;
  loadingAnswerError: string | null;
}

export const initialQuizState: QuizState = {
  question: null,
  answer: null,
  loadingQuestion: false,
  loadingQuestionError: null,
  loadingAnswer: false,
  loadingAnswerError: null,
};
