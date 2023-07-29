import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me';

type ProfileType = {
  givenName?: string;
  surname?: string;
  userPrincipalName?: string;
  id?: string;
};

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  profile$!: Observable<ProfileType>;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getProfile();
  }

  getProfile() {
    this.profile$ = this.http.get<ProfileType>(GRAPH_ENDPOINT);
  }
}
