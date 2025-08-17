import { Component } from '@angular/core';
import { ButtonComponent } from '../../../shared/button/button.component';
import { ControlComponent } from '../../../shared/control/control.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [ButtonComponent, ControlComponent, FormsModule],
  styles: `
    #new-ticket {
      width: 15rem;
    }
  `,
  template: `
    <form (ngSubmit)="onSubmit(titleInput)">
      <app-control label="Title">
        <!-- #titleInput: template variable -->
        <input type="text" name="title" id="title" #titleInput />
      </app-control>
      <app-control label="Request">
        <textarea name="request" id="request" rows="3"></textarea>
      </app-control>
      <p>
        <button appButton>
          Submit
          <span ngProjectAs="icon">→</span>
        </button>
      </p>
    </form>
  `,
})
export class NewTicketComponent {
  onSubmit(titleElement: HTMLInputElement) {
    const enteredTitle = titleElement.value;
    console.log(enteredTitle);
  }
}
