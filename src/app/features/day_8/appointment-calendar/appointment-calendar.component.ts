import { Component } from '@angular/core';
import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventApi,
} from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';

@Component({
  selector: 'app-appointment-calendar',
  template: `
    <full-calendar [options]="calendarOptions"></full-calendar>

    <p-dialog
      header="Event Details"
      [(visible)]="displayDialog"
      [style]="{ width: '300px' }"
    >
      <p *ngIf="selectedEvent">{{ selectedEvent.title }}</p>
      <p *ngIf="selectedEvent">
        Start: {{ selectedEvent.start | date: 'short' }}
      </p>
    </p-dialog>
  `,
})
export class AppointmentCalendarComponent {
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay',
    },
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    events: [
      {
        title: 'Doctor Appointment',
        date: new Date().toISOString().split('T')[0],
      },
      {
        title: 'Meeting with Team',
        date: new Date(new Date().setDate(new Date().getDate() + 2))
          .toISOString()
          .split('T')[0],
      },
    ],
  };

  displayDialog = false;
  selectedEvent: any = null;

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: this.createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`,
      )
    ) {
      clickInfo.event.remove();
    }
    // Simple demo: show dialog details? or just confirm delete?
    // Let's stick to delete confirm for simplicity as per prompt example
  }

  createEventId() {
    return String(Math.floor(Math.random() * 10000));
  }
}
