import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, of } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { QuizService } from '../../services/quiz.service';
import * as QuizActions from './quiz.actions';
import { selectCurrentQuestion } from './quiz.selectors';

@Injectable()
export class QuizEffects {
  readonly getQuestion$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(QuizActions.getQuestion),
      switchMap(() => {
        return this.quizService.getQuestion().pipe(
          map((question) => QuizActions.getQuestionSuccess({ question })),
          catchError((error) =>
            of(
              QuizActions.getQuestionError({
                error: error.error.status ? error.error.status : error.message,
              }),
            ),
          ),
        );
      }),
    );
  });

  readonly sendAnswer$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(QuizActions.sendAnswer),
      concatLatestFrom(() => this.store.select(selectCurrentQuestion)),
      filter(([_, currentQuestion]) => !!currentQuestion?.id),
      switchMap(([{ answerId }, currentQuestion]) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return this.quizService.sendAnswer(currentQuestion!.id, answerId).pipe(
          map(({ correct_answer }) =>
            QuizActions.sendAnswerSuccess({ correctAnswerId: correct_answer }),
          ),
          catchError((error) =>
            of(
              QuizActions.sendAnswerError({
                error: error.error.status ? error.error.status : error.message,
              }),
            ),
          ),
        );
      }),
    );
  });

  constructor(
    private readonly actions$: Actions,
    private readonly quizService: QuizService,
    private readonly store: Store,
  ) {}
}
