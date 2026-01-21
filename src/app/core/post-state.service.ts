import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, shareReplay, switchMap, tap } from 'rxjs/operators';

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

@Injectable({
  providedIn: 'root',
})
export class PostStateService {
  // state actions
  private selectedUserIdSubject = new BehaviorSubject<number | null>(null);

  // underlying data streams
  users$ = this.http
    .get<User[]>('https://jsonplaceholder.typicode.com/users')
    .pipe(
      shareReplay(1), // Cache the users so we don't re-fetch for every subscriber
    );

  selectedUserId$ = this.selectedUserIdSubject.asObservable();

  // derived state: posts depend on selected user
  posts$ = this.selectedUserId$.pipe(
    switchMap((userId) => {
      if (!userId) return [];
      return this.http.get<Post[]>(
        `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
      );
    }),
  );

  constructor(private http: HttpClient) {}

  selectUser(userId: number) {
    this.selectedUserIdSubject.next(userId);
  }
}
