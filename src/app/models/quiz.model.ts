interface QuizQuestionBase {
  id: string;
  questionType: QuizQuestionType;
  answerType: QuizAnswerType;
  question: string;
  answers: QuizAnswer[];
  correctAnswerId?: string;
}

export type QuizQuestionType = 'IMAGE' | 'TEXT';
export type QuizAnswerType = 'NAME'; // add more

export interface ImageQuizQuestion extends QuizQuestionBase {
  questionType: 'IMAGE';
  imageUrl: string;
}

export interface TextQuizQuestion extends QuizQuestionBase {
  questionType: 'TEXT';
}

export type QuizQuestion = ImageQuizQuestion | TextQuizQuestion;

export interface QuizAnswer {
  id: string;
  answer: string;
}
