import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

type Joke = {
  type?: string;
  setup?: string;
  punchline?: string;
  id?: number;
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  joke$!: Observable<Joke>;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getJoke();
  }

  getJoke() {
    this.joke$ = this.http.get<Joke>(
      'https://official-joke-api.appspot.com/jokes/random',
    );
  }
}
