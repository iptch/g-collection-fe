import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { QuizService } from '../../services/quiz.service';
import * as QuizActions from './quiz.actions';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class QuizEffects {
  readonly fetchQuestion$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(QuizActions.fetchQuestion),
      switchMap(({ questionRequest }) => {
        return this.quizService.fetchQuestion(questionRequest).pipe(
          map((question) => QuizActions.fetchQuestionSuccess({ question })),
          catchError((error) =>
            of(
              QuizActions.fetchQuestionError({
                error: error.error.status ? error.error.status : error.message,
              }),
            ),
          ),
        );
      }),
    );
  });

  readonly fetchAnswer$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(QuizActions.fetchAnswer),
      switchMap(({ answerRequest }) => {
        return this.quizService.fetchAnswer(answerRequest).pipe(
          map((answer) => QuizActions.fetchAnswerSuccess({ answer })),
          catchError((error) =>
            of(
              QuizActions.fetchAnswerError({
                error: error.error.status ? error.error.status : error.message,
              }),
            ),
          ),
        );
      }),
    );
  });

  readonly fetchAnswerError = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(QuizActions.fetchAnswerError),
        tap((error) => this.snackBar.open(error.error)),
      );
    },
    { dispatch: false },
  );

  constructor(
    private readonly actions$: Actions,
    private readonly quizService: QuizService,
    private readonly snackBar: MatSnackBar,
  ) {}
}
