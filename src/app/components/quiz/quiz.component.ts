import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { QuizType, getQuizType } from 'src/app/models/quiz.model';
import * as QuizActions from 'src/app/state/quiz/quiz.actions';
import {
  selectAnswer,
  selectLoadingAnswer,
  selectLoadingAnswerError,
  selectLoadingQuestion,
  selectLoadingQuestionError,
  selectQuestion,
} from 'src/app/state/quiz/quiz.selectors';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuizComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly route = inject(ActivatedRoute);

  question$ = this.store.select(selectQuestion);
  answer$ = this.store.select(selectAnswer);
  loadingQuestion$ = this.store.select(selectLoadingQuestion);
  loadingQuestionError$ = this.store.select(selectLoadingQuestionError);
  loadingAnswer$ = this.store.select(selectLoadingAnswer);
  loadingAnswerError$ = this.store.select(selectLoadingAnswerError);

  quizType = QuizType;
  questionType?: QuizType;
  answerType?: QuizType;

  ngOnInit(): void {
    this.questionType = getQuizType(
      this.route.snapshot.paramMap.get('question'),
    );
    this.answerType = getQuizType(this.route.snapshot.paramMap.get('answer'));
    this.fetchQuestion();
  }

  fetchQuestion() {
    if (!this.questionType || !this.answerType) {
      console.error('Invalid question or answer type.');
      return;
    }
    this.store.dispatch(
      QuizActions.fetchQuestion({
        questionRequest: {
          question_type: this.questionType,
          answer_type: this.answerType,
          answer_options: 4,
        },
      }),
    );
  }

  onSelectAnswer(questionId: number, answer: string) {
    this.store.dispatch(
      QuizActions.fetchAnswer({
        answerRequest: {
          question_id: questionId,
          answer: answer,
        },
      }),
    );
  }
}
