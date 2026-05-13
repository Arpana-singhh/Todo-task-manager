import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { DailyTodoItem } from '../../pages/todo-daily/todo-daily.component';

@Component({
  selector: 'app-task-move-alert-dailog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatDialogContent,
    MatDialogActions,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
  ],
  templateUrl: './task-move-alert-dailog.component.html',
  styleUrls: ['./task-move-alert-dailog.component.css'],
})
export class TaskMoveAlertDailogComponent {
  moveToDate: Date = TaskMoveAlertDailogComponent.startOfToday();

  constructor(
    private dialogRef: MatDialogRef<TaskMoveAlertDailogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DailyTodoItem
  ) {}

  save(): void {
    this.dialogRef.close({ taskDate: this.moveToDate });
  }

  cancel(): void {
    this.dialogRef.close();
  }

  private static startOfToday(): Date {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }
}
