import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { CardService } from 'src/app/services/card.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as TransferActions from './transfer.actions';

@Injectable()
export class TransferEffects {
  readonly transferCard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TransferActions.transferCard),
      switchMap((code) =>
        this.cardService.transferCard(code.code).pipe(
          map((response) =>
            TransferActions.transferCardSuccess({
              cardId: code.code.id,
              response,
            }),
          ),
          catchError((error) =>
            of(
              TransferActions.transferCardError({
                error: error.error.status ? error.error.status : error.message,
              }),
            ),
          ),
        ),
      ),
    );
  });

  readonly transferCardSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(TransferActions.transferCardSuccess),
        tap((transfer) => {
          this.router.navigate(['/cards', transfer.cardId]);
          this.snackBar.open(transfer.response.status);
        }),
      );
    },
    { dispatch: false },
  );

  constructor(
    private readonly actions$: Actions,
    private readonly cardService: CardService,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar,
  ) {}
}
