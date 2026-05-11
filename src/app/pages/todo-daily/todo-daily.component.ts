import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddDailyTodoDailogComponent } from '../../components/add-daily-todo-dailog/add-daily-todo-dailog.component';

@Component({
  selector: 'app-todo-daily',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './todo-daily.component.html',
  styleUrls: ['./todo-daily.component.css'],
})
export class TodoDailyComponent {
  constructor(private dialog: MatDialog) {}

  openAddDailyTodoDialog(): void {
    this.dialog.open(AddDailyTodoDailogComponent, {
      width: '500px',
      maxWidth: '95vw',
      panelClass: 'todo-dialog-panel',
      disableClose: false,
    });
  }
}
