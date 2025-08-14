import { Component } from '@angular/core';
import { NewTicketComponent } from './new-ticket/new-ticket.component';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [NewTicketComponent],
  styleUrl: './tickets.component.css',
  template: `
    <div id="new-ticket">
      <app-new-ticket />
    </div>
  `,
})
export class TicketsComponent {}
