import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface AppState {
  isLoading: boolean;
  error: string | null;
  data: any | null;
}

const initialState: AppState = {
  isLoading: false,
  error: null,
  data: null
};

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private _state = new BehaviorSubject<AppState>(initialState);
  public state$: Observable<AppState> = this._state.asObservable();

  constructor() { }

  setLoading(isLoading: boolean) {
    this._state.next({ ...this._state.value, isLoading });
  }

  setError(error: string | null) {
    this._state.next({ ...this._state.value, error, isLoading: false });
  }

  setData(data: any) {
    this._state.next({ ...this._state.value, data, isLoading: false, error: null });
  }

  reset() {
    this._state.next(initialState);
  }
}
