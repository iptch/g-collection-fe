import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

type Cards = {
  count?: number;
};

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
})
export class CardsComponent implements OnInit {
  cards$!: Observable<Cards>;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getCards();
  }

  getCards() {
    this.cards$ = this.http.get<Cards>(
      'https://g-collection.azurewebsites.net/cards',
    );
  }
}
