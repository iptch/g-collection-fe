import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  Answer,
  AnswerRequest,
  Question,
  QuizType,
} from 'src/app/models/quiz.model';
import * as QuizActions from 'src/app/state/quiz/quiz.actions';
import {
  selectAnswer,
  selectLoadingAnswer,
  selectLoadingAnswerError,
  selectLoadingQuestion,
  selectLoadingQuestionError,
  selectQuestion,
} from 'src/app/state/quiz/quiz.selectors';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuizComponent {
  question$?: Observable<Question | null>;
  answer$?: Observable<Answer | null>;
  loadingQuestion$?: Observable<boolean>;
  loadingQuestionError$?: Observable<string | null>;
  loadingAnswer$?: Observable<boolean>;
  loadingAnswerError$?: Observable<string | null>;

  constructor(private readonly store: Store) {
    this.question$ = this.store.select(selectQuestion);
    this.answer$ = this.store.select(selectAnswer);
    this.loadingQuestion$ = this.store.select(selectLoadingQuestion);
    this.loadingQuestionError$ = this.store.select(selectLoadingQuestionError);
    this.loadingAnswer$ = this.store.select(selectLoadingAnswer);
    this.loadingAnswerError$ = this.store.select(selectLoadingAnswerError);
  }

  onGetNewQuestion() {
    this.store.dispatch(
      QuizActions.fetchQuestion({
        questionRequest: {
          question_type: QuizType.IMAGE,
          answer_type: QuizType.NAME,
          answer_options: 4,
        },
      }),
    );
  }

  onSelectAnswer(answerRequest: AnswerRequest) {
    this.store.dispatch(QuizActions.fetchAnswer({ answerRequest }));
  }
}
