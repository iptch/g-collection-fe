interface QuizQuestionBase {
  id: string;
  type: QuizQuestionType;
  question: string;
  answers: QuizAnswer[];
}

export type QuizQuestionType = 'image' | 'text';

export interface ImageQuizQuestion extends QuizQuestionBase {
  type: 'image';
  imageUrl: string;
}

export interface TextQuizQuestion extends QuizQuestionBase {
  type: 'text';
}

export type QuizQuestion = ImageQuizQuestion | TextQuizQuestion;

export interface QuizAnswer {
  id: string;
  // TODO: QuizAnswerType;
  answer: string;
}
