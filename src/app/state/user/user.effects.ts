import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { InitialUserCreationComponent } from 'src/app/components/initial-user-creation/initial.user.creation.component';
import { UserService } from '../../services/user.service';
import * as UserActions from './user.actions';
import { User } from 'src/app/models/user.model';
import { InitialCardCreationDialog } from 'src/app/components/initial-card-creation-dialog/initial-card-creation.dialog';

@Injectable()
export class UserEffects {
  readonly initUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.initUser),
      mergeMap(() =>
        this.userService.initUser().pipe(
          map((user: User) => {
            // TODO check for first time registration
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
    const dialogRef = this.dialog.open(InitialCardCreationDialog, {
      disableClose: true,
      minWidth: '75%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
    });
  }
}
