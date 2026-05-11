import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogActions, MatDialogContent, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-daily-todo-dailog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatDialogContent, MatDialogActions, MatButtonModule],
  templateUrl: './add-daily-todo-dailog.component.html',
  styleUrls: ['./add-daily-todo-dailog.component.css'],
})
export class AddDailyTodoDailogComponent {
  constructor(private dialogRef: MatDialogRef<AddDailyTodoDailogComponent>) {}

  close(): void {
    this.dialogRef.close();
  }
}
