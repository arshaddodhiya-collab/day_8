# Project Explanation: Interceptors & Shared State

This project demonstrates two advanced Angular patterns:
1.  **Global HTTP Error Handling** using Interceptors.
2.  **Shared State Management** using RxJS and Services.

## 1. Global Error Handling
Check `core/global-error.interceptor.ts`.
- **What it does**: It intercepts *every* HTTP request sent by the application.
- **Loading State**: It sets `isLoading = true` when a request starts and `isLoading = false` when it ends (using the `finalize` operator).
- **Error State**: It catches errors (404, 500, etc.) and updates the `StateService` with the error message.
- **Benefit**: You don't need to write `isLoading = true` or `try/catch` blocks in every single component.

## 2. Shared State (Dropdown & Table)
Check `features/day_6/test/post-state.service.ts`.
This demonstrates how two components can work together without knowing about each other.

- **`UserDropdownComponent`**:
  - Displays a list of users.
  - When you select a user, it calls `postStateService.selectUser(id)`.
  - It does **not** tell the table to update directly.

- **`PostStateService`**:
  - Holds the `selectedUserId` in a `BehaviorSubject`.
  - Defines a `posts$` stream that uses `switchMap`. Whenever the user ID changes, it automatically cancels previous requests and fetches the new posts.

- **`PostTableComponent`**:
  - Simply subscribes to `postStateService.posts$`.
  - It automatically receives new data whenever the service updates.

### Data Flow
1. User Selects Dropdown -> 2. Service updates ID -> 3. RxJS triggers API call -> 4. Table receives new Posts.

## Key Files
- `core/state.service.ts`: Global app state (loading, errors).
- `core/post-state.service.ts`: Feature state (users, posts).
- `core/global-error.interceptor.ts`: The magic glue for errors.
