import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoListingComponent } from './pages/todo-listing/todo-listing.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TodoListingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'todo-task-manager';
}
