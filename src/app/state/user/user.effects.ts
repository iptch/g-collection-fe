import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { of } from 'rxjs';
import * as UserActions from './user.actions';

@Injectable()
export class UserEffects {
  readonly initUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.initUser),
      mergeMap(() =>
        this.userService.initUser().pipe(
          map((user) => {
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
  ) {}
}
