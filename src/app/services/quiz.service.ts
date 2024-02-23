import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay } from 'rxjs';
import { QuizQuestion } from '../models/quiz.model';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private readonly quizEndpoint = `${environment.backendUri}/quiz`;

  constructor(private readonly http: HttpClient) {}

  getQuestion(): Observable<QuizQuestion> {
    return this.http.get<QuizQuestion>(`${this.quizEndpoint}/question`);
  }

  sendAnswer(
    questionId: string,
    answerId: string,
  ): Observable<SendAnswerResponse> {
    return this.http
      .post<SendAnswerResponse>(`${this.quizEndpoint}/answer/`, {
        question: questionId,
        answer: answerId,
      })
      .pipe(delay(500));
  }
}

interface SendAnswerResponse {
  is_correct: boolean;
  correct_answer: string;
}
