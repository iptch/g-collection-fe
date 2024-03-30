import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {
  Answer,
  AnswerRequest,
  Question,
  QuizType,
} from 'src/app/models/quiz.model';

@Component({
  selector: 'app-quiz-question',
  templateUrl: './quiz-question.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuizQuestionComponent {
  @Input() loadingQuestion!: boolean;
  @Input() loadingAnswer!: boolean;
  @Input() question!: Question | null;
  @Input() answer!: Answer | null;

  @Output() selectAnswer = new EventEmitter<AnswerRequest>();

  quizType = QuizType;

  onSelectAnswer(questionId: number, answer: string) {
    this.selectAnswer.emit({
      question_id: questionId,
      answer: answer,
    });
  }
}
