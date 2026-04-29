import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AddTodoDialogComponent } from '../../components/add-todo-dialog/add-todo-dialog.component';

export interface TodoItem {
  id: number;
  title: string;
  detail: string;
  date: string;
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
      date: '25 Apr 2026',
      status: 'Pending',
    },
    {
      id: 2,
      title: 'Set up CI/CD pipeline',
      detail: 'Configure GitHub Actions workflow for build, test, and deploy stages. Integrate with staging environment.',
      date: '20 Apr 2026',
      status: 'Completed',
    },
    {
      id: 3,
      title: 'Write unit tests for auth module',
      detail: 'Cover login, registration, password reset, and token refresh flows. Target ≥85% code coverage.',
      date: '28 Apr 2026',
      status: 'In Progress',
    },
    {
      id: 4,
      title: 'Update project documentation',
      detail: '',   // intentionally empty to test conditional rendering
      date: '30 Apr 2026',
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
        const formatted = today.toLocaleDateString('en-GB', {
          day: '2-digit', month: 'short', year: 'numeric',
        });

        this.todos.push({
          id: Date.now(),
          title: result.title.trim(),
          detail: result.detail?.trim() ?? '',
          date: formatted,
          status: 'Pending',
        });
      }
    });
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