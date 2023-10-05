import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Dashboard } from 'src/app/models/dashboard.model';
import {
  selectDashboard,
  selectDashboardError,
  selectDashboardLoading,
  selectMyRank,
} from '../../state/dashboard/dashboard.selectors';
import { loadDashboard } from '../../state/dashboard/dashboard.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  dashboard$: Observable<Dashboard | null>;
  error$: Observable<boolean>;
  loading$: Observable<boolean>;
  myRank$: Observable<number>;

  constructor(private readonly store: Store) {
    this.dashboard$ = this.store.select(selectDashboard);
    this.error$ = this.store.select(selectDashboardError);
    this.loading$ = this.store.select(selectDashboardLoading);
    this.myRank$ = this.store.select(selectMyRank);
  }

  ngOnInit(): void {
    this.store.dispatch(loadDashboard());
  }
}
