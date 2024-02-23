import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QuizQuestion } from '../models/quiz.model';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private readonly quizEndpoint = `${environment.backendUri}/quiz`;

  constructor(private readonly http: HttpClient) {}

  // TODO: Question request params
  getQuestion(): Observable<QuizQuestion[]> {
    return this.http.get<QuizQuestion[]>(`${this.quizEndpoint}/question`);
  }
}
