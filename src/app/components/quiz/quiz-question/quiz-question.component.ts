import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ImageQuizQuestion, QuizQuestion } from 'src/app/models/quiz.model';

@Component({
  selector: 'app-quiz-question',
  templateUrl: './quiz-question.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuizQuestionComponent {
  @Input() loadingQuestion!: boolean;
  @Input() loadingAnswer!: boolean;
  @Input() question!: QuizQuestion | null;
  @Input() answerId!: string | null;

  @Output() selectAnswer = new EventEmitter<string>();

  get imageQuestion(): ImageQuizQuestion | null {
    return this.question?.questionType === 'IMAGE' ? this.question : null;
  }

  onSelectAnswer(answerId: string) {
    this.selectAnswer.emit(answerId);
  }
}
