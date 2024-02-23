import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ImageQuizQuestion, QuizQuestion } from 'src/app/models/quiz.model';

@Component({
  selector: 'app-quiz-question',
  templateUrl: './quiz-question.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuizQuestionComponent {
  @Input() loading!: boolean;
  @Input() question!: QuizQuestion | null;

  get imageQuestion(): ImageQuizQuestion | null {
    return this.question?.type === 'image' ? this.question : null;
  }
}
