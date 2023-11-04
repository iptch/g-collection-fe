import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { DistributionService } from 'src/app/services/distribution.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as DistributionActions from './distribution.actions';

@Injectable()
export class DistributionEffects {
  readonly distributeCards$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DistributionActions.distributeCards),
      switchMap(({ distribution }) =>
        this.distributionService.distributeCards(distribution).pipe(
          map((response) =>
            DistributionActions.distributeCardsSuccess({ response }),
          ),
          catchError((error) =>
            of(
              DistributionActions.distributeCardsError({
                error: error.error.status ? error.error.status : error.message,
              }),
            ),
          ),
        ),
      ),
    );
  });

  readonly distributeCardsSuccess = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(DistributionActions.distributeCardsSuccess),
        tap((response) => this.snackBar.open(response.response.status)),
      );
    },
    { dispatch: false },
  );

  readonly distributeCardsError = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(DistributionActions.distributeCardsError),
        tap((error) => this.snackBar.open(error.error)),
      );
    },
    { dispatch: false },
  );

  constructor(
    private readonly actions$: Actions,
    private readonly distributionService: DistributionService,
    private readonly snackBar: MatSnackBar,
  ) {}
}
