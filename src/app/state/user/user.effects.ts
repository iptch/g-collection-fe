import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as userActions from './user.actions';
import { UserService } from '../../services/user.service';
import { of } from 'rxjs';
import { User } from '../../models/user.model';

@Injectable()
export class UserEffects {
  readonly initUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(userActions.initUser),
      mergeMap(() =>
        this.userService.initUser().pipe(
          map((data) => {
            const user: User = {
              firstName: data.user.first_name,
              lastName: data.user.last_name,
              email: data.user.email,
              isAdmin: data.user.is_admin,
            };
            return userActions.initUserSuccess({ user });
          }),
          catchError(() => of(userActions.initUserFailed())),
        ),
      ),
    );
  });

  constructor(
    private readonly actions$: Actions,
    private readonly userService: UserService,
  ) {}
}
