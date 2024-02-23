import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { InitialUserCreationComponent } from 'src/app/components/initial-user-creation/initial.user.creation.component';
import { UserService } from '../../services/user.service';
import * as UserActions from './user.actions';

@Injectable()
export class UserEffects {
  readonly initUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.initUser),
      mergeMap(() =>
        this.userService.initUser().pipe(
          map((user) => {
            // TODO check for first time registration
            // if (true) {
            //   this.showDialog();
            // }

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
    const dialogRef = this.dialog.open(InitialUserCreationComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
    });
  }
}
