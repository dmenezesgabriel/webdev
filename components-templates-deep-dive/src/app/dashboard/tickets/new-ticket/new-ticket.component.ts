import { Component } from '@angular/core';
import { ButtonComponent } from '../../../shared/button/button.component';
import { ControlComponent } from '../../../shared/control/control.component';

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [ButtonComponent, ControlComponent],
  styles: `
    #new-ticket {
      width: 15rem;
    }
  `,
  template: `
    <form>
      <app-control label="Title">
        <input type="text" name="title" id="title" />
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
export class NewTicketComponent {}
