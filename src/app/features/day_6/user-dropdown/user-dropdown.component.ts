import { Component } from '@angular/core';
import { PostStateService } from '../../../core/post-state.service';

@Component({
  selector: 'app-user-dropdown',
  template: `
    <div class="flex flex-column gap-2">
      <label for="user-select" class="font-bold"
        >Select User to View Posts</label
      >
      <p-dropdown
        [options]="(users$ | async)!"
        optionLabel="name"
        optionValue="id"
        placeholder="Select a User"
        [showClear]="true"
        (onChange)="onUserSelect($event)"
        [style]="{ width: '100%' }"
      >
      </p-dropdown>
    </div>
  `,
})
export class UserDropdownComponent {
  users$ = this.postStateService.users$;

  constructor(private postStateService: PostStateService) {}

  onUserSelect(event: any) {
    this.postStateService.selectUser(event.value);
  }
}
