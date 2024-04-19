export enum QuizType {
  IMAGE = 'image',
  NAME = 'name',
  JOB = 'job',
  ACRONYM = 'acronym',
  START_AT_IPT = 'start_at_ipt',
  WISH_DESTINATION = 'wish_destination',
  WISH_PERSON = 'wish_person',
  WISH_SKILL = 'wish_skill',
  BEST_ADVICE = 'best_advice',
}

export function getQuizType(value: string | null): QuizType | undefined {
  return value
    ? QuizType[value.toUpperCase() as keyof typeof QuizType]
    : undefined;
}

export interface QuestionRequest {
  question_type: QuizType;
  answer_type: QuizType;
  answer_options: number;
}

export interface Question {
  question_id: number;
  question_type: QuizType;
  answer_type: QuizType;
  question_value: string;
  answer_possible_values: string[];
  answer_options: number;
  question_string: string;
}

export interface AnswerRequest {
  question_id: number;
  answer: string;
}

export interface Answer {
  is_correct: boolean;
  given_answer: string;
  correct_answer: string;
  score_change: number;
  new_score: number;
}
