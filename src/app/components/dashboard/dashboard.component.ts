import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Dashboard, Ranking } from 'src/app/models/dashboard.model';
import {
  selectDashboard,
  selectDashboardError,
  selectDashboardLoading,
  selectDashboardProgress,
  selectMyRank,
  selectTopRanking,
  selectTotalUsers,
} from '../../state/dashboard/dashboard.selectors';
import { loadDashboard } from '../../state/dashboard/dashboard.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  dashboard$: Observable<Dashboard | null>;
  error$: Observable<string | null>;
  loading$: Observable<boolean>;
  myRank$: Observable<number>;
  totalUsers$: Observable<number>;
  topRanking$: Observable<Ranking[]>;
  progress$: Observable<number>;

  constructor(private readonly store: Store) {
    this.dashboard$ = this.store.select(selectDashboard);
    this.error$ = this.store.select(selectDashboardError);
    this.loading$ = this.store.select(selectDashboardLoading);
    this.myRank$ = this.store.select(selectMyRank);
    this.totalUsers$ = this.store.select(selectTotalUsers);
    this.topRanking$ = this.store.select(selectTopRanking);
    this.progress$ = this.store.select(selectDashboardProgress);
  }

  ngOnInit(): void {
    this.store.dispatch(loadDashboard());
  }
}
