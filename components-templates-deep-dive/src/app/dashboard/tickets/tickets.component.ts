import { Component } from '@angular/core';
import { NewTicketComponent } from './new-ticket/new-ticket.component';
import type { Ticket } from './ticket.model';
import { TicketComponent } from './ticket/ticket.component';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [NewTicketComponent, TicketComponent],
  styleUrl: './tickets.component.css',
  template: `
    <div>
      <ul>
        @for(ticket of tickets; track ticket.id){
        <li>
          <app-ticket [data]="ticket" (close)="onCloseTicket(ticket.id)" />
        </li>
        } @empty {
        <p>No tickets available.</p>
        }
      </ul>
    </div>

    <div id="new-ticket">
      <app-new-ticket (add)="onAdd($event)" />
    </div>
  `,
})
export class TicketsComponent {
  tickets: Ticket[] = [];

  onAdd(ticketData: { title: string; text: string }) {
    const ticket: Ticket = {
      title: ticketData.title,
      request: ticketData.text,
      id: Math.random().toString(),
      status: 'open',
    };

    this.tickets.push(ticket);
  }

  onCloseTicket(id: string) {
    this.tickets = this.tickets.map((ticket) => {
      if (ticket.id === id) {
        return { ...ticket, status: 'closed' };
      }
      return ticket;
    });
  }
}
