import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { CardService } from 'src/app/services/card.service';
import * as CardActions from './card.actions';
import { MatDialog } from '@angular/material/dialog';

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
          map((response) => {
            if (dialogId) {
              const dialog = this.matDialog.getDialogById(dialogId);
              dialog?.close();
            }

            return CardActions.modifyCardSuccess({ statusResponse: response });
          }),
          catchError(() => of(CardActions.modifyCardError())),
        ),
      ),
    );
  });

  constructor(
    private readonly actions$: Actions,
    private readonly cardService: CardService,
    private matDialog: MatDialog,
  ) {}
}
