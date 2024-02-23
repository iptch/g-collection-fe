import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  @Input() text?: string;
  @Input() symbol?: string;
  @Input() color = 'blue';
  @Input() outlined = false;
  @Input() fullWidth = false;
  @Input() centerText = false;
}
