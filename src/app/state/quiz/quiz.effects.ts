import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { QuizService } from '../../services/quiz.service';
import * as QuizActions from './quiz.actions';

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

  constructor(
    private readonly actions$: Actions,
    private readonly quizService: QuizService,
  ) {}
}
