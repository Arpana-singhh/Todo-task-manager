import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
  MatDialogContent,
  MatDialogActions
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { TodoItem } from '../../pages/todo-listing/todo-listing.component';

@Component({
  selector: 'app-task-alert-dialog',
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
    MatIconModule
  ],
  templateUrl: './task-alert-dialog.component.html',
  styleUrls: ['./task-alert-dialog.component.css']
})
export class TaskAlertDialogComponent {
  taskName   = '';
  taskDetail = '';
  taskEndDate: Date | null = null;

  constructor(
    private dialogRef: MatDialogRef<TaskAlertDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TodoItem
  ) {
    this.taskName = data?.title ?? '';
    this.taskDetail = data?.detail ?? '';
    this.taskEndDate = data.endDate;
  }

  save(): void {
    this.dialogRef.close({
      endDate: this.taskEndDate
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }
}