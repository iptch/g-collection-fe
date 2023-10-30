import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
})
export class FieldComponent {
  @Input() label!: string;
  @Input() value?: string | number | null;
  @Input() symbol?: string;
}
