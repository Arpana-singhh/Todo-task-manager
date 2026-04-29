import { Routes } from '@angular/router';
import { TodoListingComponent } from './pages/todo-listing/todo-listing.component';

export const routes: Routes = [
    {path:'todo', component:TodoListingComponent},
    {path:'', redirectTo:'todo', pathMatch:'full'},
];
