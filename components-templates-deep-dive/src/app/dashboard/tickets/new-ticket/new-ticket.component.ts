import {
  Component,
  EventEmitter,
  Output,
  ViewChild,
  type AfterViewInit,
  type ElementRef,
} from '@angular/core';
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
    <form (ngSubmit)="onSubmit()" #form>
      <app-control label="Title">
        <!-- #titleInput: template variable -->
        <input
          type="text"
          name="title"
          id="title"
          #titleInput
          #input
          [(ngModel)]="enteredTitle"
        />
      </app-control>
      <app-control label="Request">
        <textarea
          name="request"
          id="request"
          rows="3"
          #textInput
          #input
          [(ngModel)]="enteredText"
        ></textarea>
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
export class NewTicketComponent implements AfterViewInit {
  @ViewChild('form') private form?: ElementRef<HTMLFormElement>;
  @Output() add = new EventEmitter<{ title: string; text: string }>();
  enteredTitle = '';
  enteredText = '';

  ngAfterViewInit(): void {
    // Grantee that the template has been rendered and the elements are accessible
    console.log('After view init');
    console.log(this.form?.nativeElement);
  }

  onSubmit() {
    this.add.emit({ title: this.enteredTitle, text: this.enteredText });
    this.form?.nativeElement.reset();
  }
}
