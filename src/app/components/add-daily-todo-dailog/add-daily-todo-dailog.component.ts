import { Component, Inject } from '@angular/core';
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

export interface DailyDialogData {
  id?: number;
  title?: string;
  detail?: string;
}

@Component({
  selector: 'app-add-daily-todo-dailog',
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
  ],
  templateUrl: './add-daily-todo-dailog.component.html',
  styleUrls: ['./add-daily-todo-dailog.component.css'],
})
export class AddDailyTodoDailogComponent {
  taskName   = '';
  taskDetail = '';
  readonly today = new Date();

  constructor(
    private dialogRef: MatDialogRef<AddDailyTodoDailogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DailyDialogData,
  ) {
    this.taskName   = data?.title  ?? '';
    this.taskDetail = data?.detail ?? '';
  }

  get todayLabel(): string {
    return this.today.toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }

  save(): void {
    if (!this.taskName.trim()) return;
    this.dialogRef.close({
      title:    this.taskName.trim(),
      detail:   this.taskDetail.trim(),
      taskDate: this.today,
    });
  }

  cancel(): void {
    this.dialogRef.close(undefined);
  }
}