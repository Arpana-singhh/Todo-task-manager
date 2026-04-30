import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AddTodoDialogComponent } from '../../components/add-todo-dialog/add-todo-dialog.component';
import { TaskAlertDialogComponent } from '../../components/task-alert-dialog/task-alert-dialog.component';

export interface TodoItem {
  id: number;
  title: string;
  detail: string;
  scheduledDate: Date;
  endDate: Date | null;
  status: 'Pending' | 'In Progress' | 'Completed';
}

@Component({
  selector: 'app-todo-listing',
  standalone: true,
  imports: [
    CommonModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatTooltipModule,
  ],
  templateUrl: './todo-listing.component.html',
  styleUrls: ['./todo-listing.component.css'],
})
export class TodoListingComponent {

  todos: TodoItem[] = [
    {
      id: 1,
      title: 'Design landing page mockup',
      detail: 'Create wireframes for the homepage hero section, features block, and CTA. Share with the design team for review.',
      scheduledDate: new Date('2026-04-25'),
      endDate: new Date('2026-05-02'),
      status: 'Pending',
    },
    {
      id: 2,
      title: 'Set up CI/CD pipeline',
      detail: 'Configure GitHub Actions workflow for build, test, and deploy stages. Integrate with staging environment.',
      scheduledDate: new Date('2026-04-26'),
      endDate: new Date('2026-05-03'),
      status: 'Completed',
    },
    {
      id: 3,
      title: 'Write unit tests for auth module',
      detail: 'Cover login, registration, password reset, and token refresh flows. Target ≥85% code coverage.',
      scheduledDate: new Date('2026-04-27'),
      endDate: new Date('2026-05-04'),
      status: 'In Progress',
    },
    {
      id: 4,
      title: 'Update project documentation',
      detail: '',   // intentionally empty to test conditional rendering
      scheduledDate: new Date('2026-04-28'),
      endDate: new Date('2026-04-29'),
      status: 'Pending',
    },
  ];

  constructor(private dialog: MatDialog) {}

  // ── Open Add-Todo dialog ──────────────────────────────────────
  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddTodoDialogComponent, {
      width: '500px',
      maxWidth: '95vw',
      panelClass: 'todo-dialog-panel',
      disableClose: false,
    });

    dialogRef.afterClosed().subscribe((result: Partial<TodoItem> | undefined) => {
      if (result?.title?.trim()) {
        const today = new Date();
        // const formatted = new Date(today.getFullYear(), today.getMonth(), today.getDate());

        this.todos.push({
          id: Date.now(),
          title: result.title.trim(),
          detail: result.detail?.trim() ?? '',
          scheduledDate: today,
          endDate: result.endDate ?? null,
          status: 'Pending',
        });
      }
    });
  }

  // ── Open Edit-Todo dialog ──────────────────────────────────────
  openEditDialog(todo: TodoItem): void {
    const dialogRef = this.dialog.open(AddTodoDialogComponent, {
      width: '500px',
      maxWidth: '95vw',
      panelClass: 'todo-dialog-panel',
      disableClose: false,
      data: todo
    });
  
    dialogRef.afterClosed().subscribe((result: Partial<TodoItem> | undefined) => {
      if (result?.title?.trim()) {
        todo.title = result.title.trim();
        todo.detail = result.detail?.trim() ?? '';
        todo.endDate = result.endDate ?? null;
      }
    });
  }

  openTaskAlert(todo: TodoItem): void {
    const dialogRef = this.dialog.open(TaskAlertDialogComponent, {
      width: '500px',
      panelClass: 'todo-dialog-panel',
      data: todo
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result?.endDate) {
        todo.endDate = result.endDate;
      }
    });
  }

    // Show OverDue Icon if status is Pending and endDate is Past
    showOverdueIcon(todo: TodoItem): boolean {
      if (!todo.endDate) return false;
    
      const today = new Date();
      today.setHours(0, 0, 0, 0);
    
      const endDate = new Date(todo.endDate);
      endDate.setHours(0, 0, 0, 0);
    
      return todo.status === 'Pending' && endDate < today;
    }

  // ── Toggle completed state via checkbox ───────────────────────
  toggleComplete(todo: TodoItem, checked: boolean): void {
    todo.status = checked ? 'Completed' : 'Pending';
  }

  // ── Delete a todo ─────────────────────────────────────────────
  deleteTodo(id: number): void {
    this.todos = this.todos.filter(t => t.id !== id);
  }

  // ── Computed counts ───────────────────────────────────────────
  get pendingCount(): number {
    return this.todos.filter(t => t.status !== 'Completed').length;
  }

  // ── CSS class helpers ─────────────────────────────────────────
  dotClass(status: TodoItem['status']): string {
    const map: Record<TodoItem['status'], string> = {
      Pending:      'pending',
      'In Progress':'inprogress',
      Completed:    'completed',
    };
    return map[status];
  }

  badgeClass(status: TodoItem['status']): string {
    const map: Record<TodoItem['status'], string> = {
      Pending:      'pending-badge',
      'In Progress':'inprogress-badge',
      Completed:    'completed-badge',
    };
    return map[status];
  }

  textClass(status: TodoItem['status']): string {
    const map: Record<TodoItem['status'], string> = {
      Pending:      'pending-text',
      'In Progress':'inprogress-text',
      Completed:    'completed-text',
    };
    return map[status];
  }
}