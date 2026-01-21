import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { FullCalendarModule } from '@fullcalendar/angular';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChartStatsComponent } from './chart-stats/chart-stats.component';
import { AppointmentCalendarComponent } from './appointment-calendar/appointment-calendar.component';

import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [
    DashboardComponent,
    ChartStatsComponent,
    AppointmentCalendarComponent,
  ],
  imports: [
    CommonModule,
    CardModule,
    ChartModule,
    FullCalendarModule,
    DialogModule,
  ],
  exports: [DashboardComponent],
})
export class Day7Module {}
