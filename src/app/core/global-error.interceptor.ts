import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { StateService } from './state.service';

@Injectable()
export class GlobalErrorInterceptor implements HttpInterceptor {
  constructor(private stateService: StateService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    // Only set loading if not actively managing it elsewhere (optional per request config could go here)
    // For this demo, we assume global loading for all requests intercepted here unless suppress flag is added

    // Simplification: We'll rely on the component or service to set loading start to be explicit,
    // OR we could do it here. Let's do it here for "Global" feel.
    this.stateService.setLoading(true);

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unknown error occurred!';
        if (error.error instanceof ErrorEvent) {
          // Client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // Server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }

        // Push error to state service
        this.stateService.setError(errorMessage);

        // Return throwError so components can handle specific cases if needed
        return throwError(() => new Error(errorMessage));
      }),
      finalize(() => {
        // Stop loading when request completes (success or error)
        // Note: verify if this conflicts with multiple parallel requests.
        // For simple demo, this is fine. For production, use a counter.
        // We will keep it simple.
        this.stateService.setLoading(false);
      }),
    );
  }
}
