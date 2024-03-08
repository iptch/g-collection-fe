import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  @Input() disabled = false;
  @Input() text?: string;
  @Input() symbol?: string;
  @Input() color: 'blue' | 'green' | 'pink' | 'red' = 'blue';
  @Input() outlined = false;
  @Input() fullWidth = false;
  @Input() centerText = false;
  @Input() transparent = false;
  @Input() loading = false;
}
