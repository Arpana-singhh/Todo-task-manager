import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  MatDialogRef,
  MatDialogModule,
  MatDialogContent,
  MatDialogActions,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MonthTodoItem } from '../../pages/todo-month/todo-month.component';

export interface MonthDialogData {
  year: number;
  month: number;           // 0-indexed
  id?: number;             // present when editing
  title?: string;
  detail?: string;
  taskDate?: Date;
}

@Component({
  selector: 'app-add-month-todo-dialog',
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
    TextFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
  ],
  templateUrl: './add-month-todo-dialog.component.html',
  styleUrls: ['./add-month-todo-dialog.component.css'],
})
export class AddMonthTodoDialogComponent {

  taskName   = '';
  taskDetail = '';
  taskDate:   Date | null = null;

  /** First and last day of the selected month (for datepicker filter) */
  minDate: Date;
  maxDate: Date;

  constructor(
    private dialogRef: MatDialogRef<AddMonthTodoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MonthDialogData,
  ) {
    const { year, month } = data;
    this.minDate = new Date(year, month, 1);
    this.maxDate = new Date(year, month + 1, 0);   // last day of month

    // Pre-fill when editing
    this.taskName   = data.title    ?? '';
    this.taskDetail = data.detail   ?? '';
    this.taskDate   = data.taskDate ? new Date(data.taskDate) : null;
  }

  /** Prevent dates outside the selected month */
  dateFilter = (d: Date | null): boolean => {
    if (!d) return false;
    return d >= this.minDate && d <= this.maxDate;
  };

  get monthLabel(): string {
    return this.minDate.toLocaleString('default', { month: 'long', year: 'numeric' });
  }

  save(): void {
    if (!this.taskName.trim() || !this.taskDate) return;
    this.dialogRef.close({
      title:    this.taskName.trim(),
      detail:   this.taskDetail.trim(),
      taskDate: this.taskDate,
    });
  }

  cancel(): void {
    this.dialogRef.close(undefined);
  }
}