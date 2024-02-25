import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import * as UserActions from './user.actions';
import { User } from 'src/app/models/user.model';
import { InitialCardCreationDialogComponent } from 'src/app/components/initial-card-creation-dialog/initial-card-creation.dialog';

@Injectable()
export class UserEffects {
  readonly initUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.initUser),
      mergeMap(() =>
        this.userService.initUser().pipe(
          map((user: User) => {
            if (!user?.['card_id']) {
              this.showDialog();
            }

            return UserActions.initUserSuccess({ user });
          }),
          catchError((error) =>
            of(
              UserActions.initUserFailed({
                error: error.error.status ? error.error.status : error.message,
              }),
            ),
          ),
        ),
      ),
    );
  });

  constructor(
    private readonly actions$: Actions,
    private readonly userService: UserService,
    public dialog: MatDialog,
  ) {}

  showDialog() {
    this.dialog.open(InitialCardCreationDialogComponent, {
      disableClose: true,
      maxWidth: '100%',
      width: '90%',
      height: '90%',
    });
  }
}
