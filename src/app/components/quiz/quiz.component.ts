import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { QuizQuestion } from 'src/app/models/quiz.model';
import * as QuizActions from 'src/app/state/quiz/quiz.actions';
import {
  selectCurrentQuestion,
  selectLoadingQuestion,
  selectLoadingQuestionError,
} from 'src/app/state/quiz/quiz.selectors';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuizComponent implements OnDestroy {
  currentQuestion$?: Observable<QuizQuestion | null>;
  isCurrentQuestionAnswered$?: Observable<boolean>;
  loadingQuestion$?: Observable<boolean>;
  loadingQuestionError$?: Observable<string | null>;

  private readonly destroy$ = new Subject<void>();

  constructor(private readonly store: Store) {
    this.currentQuestion$ = this.store.select(selectCurrentQuestion);
    this.loadingQuestion$ = this.store.select(selectLoadingQuestion);
    this.loadingQuestionError$ = this.store.select(selectLoadingQuestionError);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onGetNewQuestion() {
    this.store.dispatch(QuizActions.getQuestion());
  }

  onSelectAnswer(answerId: string) {
    // TODO
  }
}
