import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TextFieldModule } from '@angular/cdk/text-field';

@Component({
  selector: 'app-add-todo-dialog',
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
  templateUrl: './add-todo-dialog.component.html',
  styleUrls: ['./add-todo-dialog.component.css'],
})
export class AddTodoDialogComponent {
  taskName   = '';
  taskDetail = '';

  constructor(private dialogRef: MatDialogRef<AddTodoDialogComponent>) {}

  save(): void {
    if (!this.taskName.trim()) return;

    this.dialogRef.close({
      title:  this.taskName.trim(),
      detail: this.taskDetail.trim(),
    });
  }

  cancel(): void {
    this.dialogRef.close(undefined);
  }
}