import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay } from 'rxjs';
import {
  Answer,
  AnswerRequest,
  Question,
  QuestionRequest,
} from '../models/quiz.model';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private readonly quizEndpoint = `${environment.backendUri}/quiz`;

  constructor(private readonly http: HttpClient) {}

  fetchQuestion(question: QuestionRequest): Observable<Question> {
    return this.http.post<Question>(`${this.quizEndpoint}/question/`, question);
  }

  fetchAnswer(answer: AnswerRequest): Observable<Answer> {
    return this.http
      .post<Answer>(`${this.quizEndpoint}/answer/`, answer)
      .pipe(delay(500));
  }
}
