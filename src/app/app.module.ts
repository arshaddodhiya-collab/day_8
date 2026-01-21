import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { GlobalErrorInterceptor } from './core/global-error.interceptor';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { UserDropdownComponent } from './features/day_6/user-dropdown/user-dropdown.component';
import { PostTableComponent } from './features/day_6/post-table/post-table.component';
import { Day6TestComponent } from './features/day_6/test/test.component';

@NgModule({
  declarations: [
    AppComponent,
    Day6TestComponent,
    UserDropdownComponent,
    PostTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ButtonModule,
    ToastModule,
    CardModule,
    ProgressSpinnerModule,
    DropdownModule,
    TableModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
