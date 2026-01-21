import { Component } from '@angular/core';
import { PostStateService } from '../../../core/post-state.service';

@Component({
  selector: 'app-post-table',
  template: `
    <div *ngIf="posts$ | async as posts">
      <div *ngIf="posts.length > 0; else noSelection">
        <p-table
          [value]="posts"
          [tableStyle]="{ 'min-width': '50rem' }"
          styleClass="p-datatable-sm p-datatable-gridlines shadow-2 border-round"
        >
          <ng-template pTemplate="header">
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Body</th>
            </tr>
          </ng-template>
          <ng-template pTemplate="body" let-post>
            <tr>
              <td>{{ post.id }}</td>
              <td class="font-bold">{{ post.title }}</td>
              <td>{{ post.body }}</td>
            </tr>
          </ng-template>
        </p-table>
      </div>
      <ng-template #noSelection>
        <div class="text-center p-5 surface-ground border-round">
          <i class="pi pi-info-circle text-2xl text-500 mb-2"></i>
          <p class="text-500">Select a user to see their posts.</p>
        </div>
      </ng-template>
    </div>
  `,
})
export class PostTableComponent {
  posts$ = this.postStateService.posts$;

  constructor(private postStateService: PostStateService) {}
}
