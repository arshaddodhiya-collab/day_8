import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StateService } from '../../../core/state.service';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-day6-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
  providers: [MessageService],
})
export class Day6TestComponent {
  // Using direct public access for template binding for simplicity
  // In a real app, strict Observables or Signals would be better
  state$ = this.stateService.state$;

  constructor(
    private http: HttpClient,
    private stateService: StateService,
    private messageService: MessageService,
  ) {
    // Subscribe to state changes to show toasts based on global state
    this.stateService.state$.subscribe((state) => {
      if (state.error) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: state.error,
        });
      }
    });
  }

  triggerSuccess() {
    this.http.get('https://jsonplaceholder.typicode.com/posts/1').subscribe({
      next: (data) => {
        this.stateService.setData(data);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Data loaded successfully',
        });
      },
    });
  }

  triggerError() {
    // 404 Error
    this.http
      .get('https://jsonplaceholder.typicode.com/posts/invalid-id-for-404')
      .subscribe({
        next: () => {}, // Should not happen
        error: (err) => {
          // Error is handled by Global Interceptor which updates StateService
          // We can also handle local UI updates if needed specifically here
        },
      });
  }

  reset() {
    this.stateService.reset();
  }
}
