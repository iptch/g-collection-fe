import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dashboard, Ranking } from '../models/dashboard.model';
import { environment } from 'src/environments/environment';
import { Profile } from '../models/profile.model';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private readonly http: HttpClient) {}

  getDashboardData(user: Observable<Profile | null>): Observable<Dashboard> {
    return user.pipe(
      switchMap((user) => {
        // Return empty dashboard if no user is found
        if (user === null) {
          return of<Dashboard>({
            myCardsCount: 0,
            myUniqueCardsCount: 0,
            allCardsCount: 0,
            duplicateCardsCount: 0,
            rankingList: [],
          });
        }

        return this.http.get<Dashboard>(`${environment.backendUri}/overview`);
      }),
    );
  }

  getRankOf(userEmail: string, rankingList: Ranking[]): number {
    return (
      rankingList.find((ranking) => ranking.userEmail === userEmail)?.rank ?? 0
    );
  }
}
