import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Day6TestComponent } from './features/day_6/test/test.component';
import { DashboardComponent } from './features/day_8/dashboard/dashboard.component';

const routes: Routes = [
  { path: 'day-6/test', component: Day6TestComponent },
  { path: 'day-7/dashboard', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
