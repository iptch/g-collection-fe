import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, zip } from 'rxjs';
import { Dashboard } from 'src/app/models/dashboard.model';
import { DashboardService } from 'src/app/services/dashboard.service';
import { selectProfile } from 'src/app/state/profile/profile.selectors';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  dashboardData$?: Observable<Dashboard>;
  myRank?: number;

  constructor(
    private readonly dashboardService: DashboardService,
    private readonly store: Store,
  ) {}

  ngOnInit(): void {
    this.dashboardData$ = this.dashboardService.getDashboardData(
      this.store.select(selectProfile),
    );

    zip([this.dashboardData$, this.store.select(selectProfile)]).subscribe(
      ([dashboardData, user]) => {
        if (!user) {
          this.myRank = undefined;
        } else {
          this.myRank = this.dashboardService.getRankOf(
            user.userPrincipalName,
            dashboardData.rankingList,
          );
        }
      },
    );
  }
}
