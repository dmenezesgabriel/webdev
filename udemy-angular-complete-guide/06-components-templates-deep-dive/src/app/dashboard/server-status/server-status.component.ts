import { Component, type OnDestroy, type OnInit } from '@angular/core';
import type { interval } from 'rxjs';

@Component({
  selector: 'app-server-status',
  standalone: true,
  imports: [],
  styleUrl: './server-status.component.css',
  template: `
    <div
      [class]="{
        status: true,
        'status-online': currentStatus === 'online',
        'status-offline': currentStatus === 'offline',
        'status-unknown': currentStatus === 'unknown'
      }"
    >
      @if (currentStatus === 'online') {
      <p>Servers are online</p>
      <p>All systems are operational.</p>
      } @else if (currentStatus === 'offline') {
      <p>Servers are offline</p>
      <p>Functionality should be restored soon.</p>
      } @else {
      <p>Server status is unknown</p>
      <p>Fetching server status failed.</p>
      }
    </div>
  `,
})
export class ServerStatusComponent implements OnInit, OnDestroy {
  currentStatus: 'online' | 'offline' | 'unknown' = 'online';
  private interval?: ReturnType<typeof setInterval>;

  constructor() {}

  ngOnInit() {
    this.interval = setInterval(() => {
      console.log('On Init');
      const rnd = Math.random();

      if (rnd < 0.5) {
        this.currentStatus = 'online';
      } else if (rnd < 0.9) {
        this.currentStatus = 'offline';
      } else {
        this.currentStatus = 'unknown';
      }
    }, 5000);
  }

  ngAfterViewInit() {
    console.log('After view init');
  }

  ngOnDestroy(): void {
    // DestroyRef (>=v16)
    clearTimeout(this.interval);
  }
}
