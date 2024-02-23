interface QuizQuestionBase {
  id: string;
  type: QuizQuestionType;
  question: string;
  answers: QuizAnswer[];
  correctAnswerId?: string;
}

export type QuizQuestionType = 'IMAGE' | 'TEXT';

export interface ImageQuizQuestion extends QuizQuestionBase {
  type: 'IMAGE';
  image_url: string;
}

export interface TextQuizQuestion extends QuizQuestionBase {
  type: 'TEXT';
}

export type QuizQuestion = ImageQuizQuestion | TextQuizQuestion;

export interface QuizAnswer {
  id: string;
  // TODO: QuizAnswerType;
  answer: string;
}
