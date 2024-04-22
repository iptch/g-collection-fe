import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { take, tap } from 'rxjs';
import { QuizType } from 'src/app/models/quiz.model';
import { setPersonInQuestion } from 'src/app/state/quiz/quiz.actions';
import { selectPersonInQuestion } from 'src/app/state/quiz/quiz.selectors';

type Quiz = {
  text: string;
  symbol: string;
  type: QuizType;
};

@Component({
  selector: 'app-quiz-selector',
  templateUrl: './quiz-selector.component.html',
})
export class QuizSelectorComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  personInQuestion = new FormControl();
  quizzes: Quiz[] = [
    {
      text: 'Bild',
      symbol: 'person_book',
      type: QuizType.IMAGE,
    },
    {
      text: 'Start bei ipt',
      symbol: 'event',
      type: QuizType.START_AT_IPT,
    },
    {
      text: 'Reisewunsch',
      symbol: 'travel_explore',
      type: QuizType.WISH_DESTINATION,
    },
    {
      text: 'Tauschen mit',
      symbol: 'supervised_user_circle',
      type: QuizType.WISH_PERSON,
    },
    {
      text: 'Skill',
      symbol: 'local_library',
      type: QuizType.WISH_SKILL,
    },
    {
      text: 'Ratschlag',
      symbol: 'lightbulb',
      type: QuizType.BEST_ADVICE,
    },
    {
      text: 'Go random, baby!',
      symbol: 'quiz',
      type: QuizType.RANDOM,
    },
  ];

  ngOnInit(): void {
    this.store
      .select(selectPersonInQuestion)
      .pipe(
        take(1),
        tap((personInQuestion: boolean) => {
          this.personInQuestion.setValue(personInQuestion);
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
      });
  }

  selectQuiz(quiz: Quiz) {
    const qType = this.personInQuestion.value ? QuizType.NAME : quiz.type;
    const aType = this.personInQuestion.value ? quiz.type : QuizType.NAME;
    this.router.navigate([`/quiz/question/${qType}/answer/${aType}`]);
  }
}
