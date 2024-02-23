import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-initial-user-creation',
  templateUrl: 'initial.user.creation.component.html',
})
export class InitialUserCreationComponent {
  user!: FormGroup;

  ngOnInit() {
    this.user = new FormGroup({
      dateInput: new FormControl(''), // Date input
      textInput1: new FormControl(''), // First text input
      textInput2: new FormControl(''), // Second text input
      textInput3: new FormControl(''), // Third text input
    });
  }

  onSubmit() {
    console.log('Form Value:', this.user.value);
  }
}
