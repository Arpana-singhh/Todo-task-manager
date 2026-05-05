import { Routes } from '@angular/router';
import { TodoListingComponent } from './pages/todo-listing/todo-listing.component';
import { PlannerComponent } from './pages/planner/planner.component';
import { TodoMonthComponent } from './pages/todo-month/todo-month.component';
import { TodoDailyComponent } from './pages/todo-daily/todo-daily.component';

export const routes: Routes = [
  { path: 'planner', component: PlannerComponent },
  { path: 'todo', component: TodoListingComponent },
  { path: 'todomonth', component: TodoMonthComponent },
  { path: 'tododaily', component: TodoDailyComponent },
  { path: '', redirectTo: 'planner', pathMatch: 'full' },
];
