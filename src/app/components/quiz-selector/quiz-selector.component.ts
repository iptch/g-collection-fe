import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { take, tap } from 'rxjs';
import { QuizType } from 'src/app/models/quiz.model';
import { setPersonInQuestion } from 'src/app/state/quiz/quiz.actions';
import { selectPersonInQuestion } from 'src/app/state/quiz/quiz.selectors';

type Quiz = {
  text: string;
  symbol: string;
  questionType: QuizType;
  answerType: QuizType;
};

@Component({
  selector: 'app-quiz-selector',
  templateUrl: './quiz-selector.component.html',
})
export class QuizSelectorComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly destroyRef = inject(DestroyRef);

  personInQuestion = new FormControl();
  quizzes?: Quiz[];

  ngOnInit(): void {
    this.store
      .select(selectPersonInQuestion)
      .pipe(
        take(1),
        tap((personInQuestion: boolean) => {
          this.personInQuestion.setValue(personInQuestion);
          this.initQuizzes();
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();

    this.personInQuestion.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((personInQuestion) => {
        this.store.dispatch(
          setPersonInQuestion({ personInQuestion: personInQuestion! }),
        );
        this.initQuizzes();
      });
  }

  private initQuizzes(): void {
    this.quizzes = [
      {
        text: 'Bild',
        symbol: 'person_book',
        questionType: QuizType.IMAGE,
        answerType: QuizType.NAME,
      },
      {
        text: 'Start bei ipt',
        symbol: 'event',
        questionType: this.setQuestionType(QuizType.START_AT_IPT),
        answerType: this.setAnswerType(QuizType.START_AT_IPT),
      },
      {
        text: 'Reisewunsch',
        symbol: 'travel_explore',
        questionType: this.setQuestionType(QuizType.WISH_DESTINATION),
        answerType: this.setAnswerType(QuizType.WISH_DESTINATION),
      },
      {
        text: 'Tauschen mit',
        symbol: 'supervised_user_circle',
        questionType: this.setQuestionType(QuizType.WISH_PERSON),
        answerType: this.setAnswerType(QuizType.WISH_PERSON),
      },
      {
        text: 'Skill',
        symbol: 'local_library',
        questionType: this.setQuestionType(QuizType.WISH_SKILL),
        answerType: this.setAnswerType(QuizType.WISH_SKILL),
      },
      {
        text: 'Ratschlag',
        symbol: 'lightbulb',
        questionType: this.setQuestionType(QuizType.BEST_ADVICE),
        answerType: this.setAnswerType(QuizType.BEST_ADVICE),
      },
    ];
  }

  private setQuestionType(quizType: QuizType): QuizType {
    return this.personInQuestion.value ? QuizType.NAME : quizType;
  }

  private setAnswerType(quizType: QuizType): QuizType {
    return this.personInQuestion.value ? quizType : QuizType.NAME;
  }
}
