import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DashboardService } from '../../services/dashboard.service';
import { catchError, map, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import * as DashboardActions from './dashboard.actions';

@Injectable()
export class DashboardEffects {
  readonly loadDashboard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DashboardActions.loadDashboard),
      switchMap(() => {
        return this.dashboardService.getDashboardData().pipe(
          map((dashboard) =>
            DashboardActions.loadDashboardSuccess({ dashboard }),
          ),
          catchError((error) =>
            of(
              DashboardActions.loadDashboardError({
                error: error.error.status ? error.error.status : error.message,
              }),
            ),
          ),
        );
      }),
    );
  });

  constructor(
    private readonly actions$: Actions,
    private readonly dashboardService: DashboardService,
  ) {}
}
