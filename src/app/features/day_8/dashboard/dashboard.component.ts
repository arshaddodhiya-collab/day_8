import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="grid">
      <!-- Stats Section -->
      <div class="col-12 xl:col-5">
        <div class="card shadow-2 h-full">
          <h2 class="ml-3 mt-3 text-900">Statistics</h2>
          <app-chart-stats></app-chart-stats>
        </div>
      </div>

      <!-- Calendar Section -->
      <div class="col-12 xl:col-7">
        <div class="card shadow-2 h-full">
          <div
            class="flex justify-content-between align-items-center mb-4 ml-3 mr-3 mt-3"
          >
            <h2 class="text-900 m-0">Appointment Schedule</h2>
            <span class="p-tag severity-info">Interactive</span>
          </div>
          <div class="p-3">
            <app-appointment-calendar></app-appointment-calendar>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class DashboardComponent {}
