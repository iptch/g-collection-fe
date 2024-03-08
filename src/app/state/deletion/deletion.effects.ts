import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import * as DeletionActions from './deletion.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { deletionService } from 'src/app/services/deletion.service';

@Injectable()
export class DeletionEffects {
  readonly deleteUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DeletionActions.deleteUser),
      mergeMap(({ email }) =>
        this.deletionService.deleteUser(email).pipe(
          map((response) => {
            return DeletionActions.deleteUserSuccess({ response });
          }),
          catchError((error) =>
            of(
              DeletionActions.deleteUserFailed({
                error: error.error.status ? error.error.status : error.message,
              }),
            ),
          ),
        ),
      ),
    );
  });

  readonly deleteUserSuccess = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(DeletionActions.deleteUserSuccess),
        tap((response) =>
          this.snackBar.open(response.response.status, undefined, {
            duration: 10000,
          }),
        ),
      );
    },
    { dispatch: false },
  );

  readonly deleteUserError = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(DeletionActions.deleteUserFailed),
        tap((error) => this.snackBar.open(error.error)),
      );
    },
    { dispatch: false },
  );

  constructor(
    private readonly actions$: Actions,
    private readonly deletionService: deletionService,
    private readonly snackBar: MatSnackBar,
  ) {}
}
