import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { CardService } from 'src/app/services/card.service';
import * as CardActions from './card.actions';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class CardEffects {
  readonly loadCards$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CardActions.loadCards),
      switchMap(() =>
        this.cardService.getCards().pipe(
          map((cards) => CardActions.loadCardsSuccess({ cards })),
          catchError(() => of(CardActions.loadCardsError())),
        ),
      ),
    );
  });

  readonly loadCardById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CardActions.loadCardById),
      switchMap(({ id }) =>
        this.cardService.getCardById(id).pipe(
          map((card) => CardActions.loadCardByIdSuccess({ card })),
          catchError(() => of(CardActions.loadCardByIdError())),
        ),
      ),
    );
  });

  readonly modifyCard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CardActions.modifyCard),
      switchMap(({ userCard, dialogId }) =>
        this.cardService.modifyCard(userCard).pipe(
          map((card) => {
            if (dialogId) {
              const dialog = this.matDialog.getDialogById(dialogId);
              dialog?.close();
            }
            return CardActions.modifyCardSuccess({ card });
          }),
          catchError((error) =>
            of(
              CardActions.modifyCardError({
                error: error.error.status ? error.error.status : error.message,
              }),
            ),
          ),
        ),
      ),
    );
  });

  readonly modifyCardSuccess = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(CardActions.modifyCardSuccess),
        tap(() => this.snackBar.open('Dein Chärtli wurde gespeichert.')),
      );
    },
    { dispatch: false },
  );

  readonly modifyCardError = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(CardActions.modifyCardError),
        tap((error) => this.snackBar.open(error.error)),
      );
    },
    { dispatch: false },
  );

  constructor(
    private readonly actions$: Actions,
    private readonly cardService: CardService,
    private readonly matDialog: MatDialog,
    private readonly snackBar: MatSnackBar,
  ) {}
}
