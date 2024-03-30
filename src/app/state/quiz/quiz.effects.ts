import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { QuizService } from '../../services/quiz.service';
import * as QuizActions from './quiz.actions';

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

  constructor(
    private readonly actions$: Actions,
    private readonly quizService: QuizService,
  ) {}
}
