import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AddMonthTodoDialogComponent } from '../../components/add-month-todo-dialog/add-month-todo-dialog.component';

export interface MonthTodoItem {
  id: number;
  title: string;
  detail: string;
  taskDate: Date;
  status: 'Pending' | 'Completed';
}

export interface DayGroup {
  date: Date;
  dateLabel: string;
  dayName: string;
  isToday: boolean;
  tasks: MonthTodoItem[];
}

@Component({
  selector: 'app-todo-month',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatCheckboxModule,
    MatSelectModule,      // ← add
    MatFormFieldModule,   // ← add
  ],
  templateUrl: './todo-month.component.html',
  styleUrls: ['./todo-month.component.css'],
})
export class TodoMonthComponent implements OnInit {

  // ── Month selector ────────────────────────────────────────────
  availableMonths: { label: string; year: number; month: number }[] = [];
  selectedMonthKey = '';   // e.g. "2026-05"
  filteredTasks: MonthTodoItem[] = [];
  dayGroups:     DayGroup[]      = [];
  totalCount   = 0;
  pendingCount = 0;
  doneCount    = 0;

  // ── Tasks ─────────────────────────────────────────────────────
  tasks: MonthTodoItem[] = [
    {
      id: 1,
      title: 'Review quarterly goals',
      detail: 'Go through Q2 targets and update progress metrics.',
      taskDate: new Date(),
      status: 'Pending',
    },
    {
      id: 2,
      title: 'Team sync meeting',
      detail: 'Weekly sync with the product team.',
      taskDate: new Date(),
      status: 'Completed',
    },
  ];

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this._buildMonthOptions();
    // Default: current month
    const now = new Date();
    this.selectedMonthKey = this._toKey(now.getFullYear(), now.getMonth());
    this._recompute(); 
  }

  // ── Build 12-month window (3 past + current + 8 future) ──────
  private _buildMonthOptions(): void {
    const now   = new Date();
    const start = new Date(now.getFullYear(), now.getMonth() - 3, 1);
    for (let i = 0; i < 12; i++) {
      const d = new Date(start.getFullYear(), start.getMonth() + i, 1);
      this.availableMonths.push({
        label: d.toLocaleString('default', { month: 'long', year: 'numeric' }),
        year:  d.getFullYear(),
        month: d.getMonth(),
      });
    }
  }

  private _toKey(year: number, month: number): string {
    return `${year}-${String(month).padStart(2, '0')}`;
  }

  private _recompute(): void {
    const { year, month } = this.selectedMonthObj;

    this.filteredTasks = this.tasks.filter(t => {
      const d = new Date(t.taskDate);
      return d.getFullYear() === year && d.getMonth() === month;
    });

    const map = new Map<string, MonthTodoItem[]>();
    this.filteredTasks.forEach(t => {
      const d   = new Date(t.taskDate);
      const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(t);
    });

    const today = new Date();
    const groups: DayGroup[] = [];
    map.forEach(tasks => {
      const d = new Date(tasks[0].taskDate);
      groups.push({
        date:      d,
        dateLabel: d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }),
        dayName:   d.toLocaleDateString('en-GB', { weekday: 'long' }),
        isToday:
          d.getDate()     === today.getDate() &&
          d.getMonth()    === today.getMonth() &&
          d.getFullYear() === today.getFullYear(),
        tasks,
      });
    });

    this.dayGroups   = groups.sort((a, b) => a.date.getTime() - b.date.getTime());
    this.totalCount  = this.filteredTasks.length;
    this.pendingCount = this.filteredTasks.filter(t => t.status !== 'Completed').length;
    this.doneCount   = this.filteredTasks.filter(t => t.status === 'Completed').length;
  }

  // Add an ngOnChanges-style watcher for month selector changes
  // In the HTML, change the select binding to call a method:
  onMonthChange(): void {
    this._recompute();
  }

  get selectedMonthObj(): { year: number; month: number } {
    const found = this.availableMonths.find(
      m => this._toKey(m.year, m.month) === this.selectedMonthKey
    );
    return found ?? this.availableMonths[3]; // fallback to current
  }

  get selectedMonthLabel(): string {
    return this.availableMonths.find(
      m => this._toKey(m.year, m.month) === this.selectedMonthKey
    )?.label ?? '';
  }

  // ── Open Add dialog ───────────────────────────────────────────
  openAddDialog(): void {
    const { year, month } = this.selectedMonthObj;
    const dialogRef = this.dialog.open(AddMonthTodoDialogComponent, {
      width: '500px',
      maxWidth: '95vw',
      panelClass: 'todo-dialog-panel',
      disableClose: false,
      data: { year, month },
    });

    dialogRef.afterClosed().subscribe((result: Partial<MonthTodoItem> | undefined) => {
      if (result?.title?.trim() && result.taskDate) {
        this.tasks.push({
          id:       Date.now(),
          title:    result.title.trim(),
          detail:   result.detail?.trim() ?? '',
          taskDate: new Date(result.taskDate),
          status:   'Pending',
        });
      }
    });
  }

  // ── Open Edit dialog ──────────────────────────────────────────
  openEditDialog(task: MonthTodoItem): void {
    const { year, month } = this.selectedMonthObj;
    const dialogRef = this.dialog.open(AddMonthTodoDialogComponent, {
      width: '500px',
      maxWidth: '95vw',
      panelClass: 'todo-dialog-panel',
      disableClose: false,
      data: { year, month, ...task },
    });

    dialogRef.afterClosed().subscribe((result: Partial<MonthTodoItem> | undefined) => {
      if (result?.title?.trim() && result.taskDate) {
        task.title    = result.title.trim();
        task.detail   = result.detail?.trim() ?? '';
        task.taskDate = new Date(result.taskDate);
      }
    });
  }

  // ── Toggle complete ───────────────────────────────────────────
  toggleComplete(task: MonthTodoItem, checked: boolean): void {
    task.status = checked ? 'Completed' : 'Pending';
    this._recompute(); // ← add
  }

  // ── Delete ────────────────────────────────────────────────────
  deleteTask(id: number): void {
    this.tasks = this.tasks.filter(t => t.id !== id);
    this._recompute(); // ← add
  }
}