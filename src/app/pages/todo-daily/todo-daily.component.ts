import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  AddDailyTodoDailogComponent,
  DailyDialogData,
} from '../../components/add-daily-todo-dailog/add-daily-todo-dailog.component';
import { TaskMoveAlertDailogComponent } from '../../components/task-move-alert-dailog/task-move-alert-dailog.component';

export interface DailyTodoItem {
  id:       number;
  title:    string;
  detail:   string;
  taskDate: Date;
  status:   'Pending' | 'Completed';
}

export interface DayGroup {
  date:      Date;
  dateLabel: string;
  dayName:   string;
  isToday:   boolean;
  tasks:     DailyTodoItem[];
}

@Component({
  selector: 'app-todo-daily',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatCheckboxModule],
  templateUrl: './todo-daily.component.html',
  styleUrls: ['./todo-daily.component.css'],
})

export class TodoDailyComponent {
  dayGroups: DayGroup[]=[];
  totalCount=0;
  pendingCount=0;
  doneCount=0;

    tasks: DailyTodoItem[] = [
    {
      id: 1,
      title: 'Morning standup',
      detail: 'Attend daily team sync meeting',
      taskDate: new Date('2026-05-11'),
      status: 'Pending'
    },
    {
      id: 2,
      title: 'Fix login bug',
      detail: 'Resolve token refresh issue on dashboard',
      taskDate: new Date('2026-05-11'),
      status: 'Completed'
    },
    {
      id: 3,
      title: 'Review pull request',
      detail: 'Check planner module UI changes',
      taskDate: new Date('2026-05-12'),
      status: 'Pending'
    },
    {
      id: 4,
      title: 'Write documentation',
      detail: 'Add usage notes for daily planner component',
      taskDate: new Date('2026-05-12'),
      status: 'Pending'
    },
    {
      id: 5,
      title: 'Refactor service',
      detail: 'Clean up API response mapping',
      taskDate: new Date('2026-05-13'),
      status: 'Completed'
    }
  ];

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this._recompute();
  }

    // ── Heading ───────────────────────────────────────────
  get todayHeading(): string {
    return new Date().toLocaleDateString('en-GB', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    });
  }

    // ── Recompute groups & stats ──────────────────────────
  private _recompute(): void {
    const map = new Map<string, DailyTodoItem[]>();

    this.tasks.forEach(t => {
      const d   = new Date(t.taskDate);
      const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(t);
    });

    console.log(map)

    const today  = new Date();
    const groups: DayGroup[] = [];

  
    map.forEach(tasks => {
      const d = new Date(tasks[0].taskDate);
      groups.push({
        date:      d,
        dateLabel: d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }),
        dayName:   d.toLocaleDateString('en-GB', { weekday: 'long' }),
        isToday:
          d.getDate()     === today.getDate()     &&
          d.getMonth()    === today.getMonth()    &&
          d.getFullYear() === today.getFullYear(),
        tasks,
      });
    });

    console.log("groups", groups)

    // Today's group floats to top; rest sorted newest-first
    this.dayGroups = groups.sort((a, b) => {
      if (a.isToday) return -1;
      if (b.isToday) return  1;
      return b.date.getTime() - a.date.getTime();
    });

    console.log("dayGroups" , this.dayGroups)

    this.totalCount   = this.tasks.length;
    this.pendingCount = this.tasks.filter(t => t.status !== 'Completed').length;
    this.doneCount    = this.tasks.filter(t => t.status === 'Completed').length;
  }

  openAddDialog(): void {
    const ref = this.dialog.open(AddDailyTodoDailogComponent, {
      width: '500px',
      maxWidth: '95vw',
      panelClass: 'todo-dialog-panel',
      disableClose: false,
      data: {} as DailyDialogData,
    });

    ref.afterClosed().subscribe((result?: Partial<DailyTodoItem>) => {
      if (result?.title?.trim() && result.taskDate) {
        this.tasks.push({
          id:       Date.now(),
          title:    result.title.trim(),
          detail:   result.detail?.trim() ?? '',
          taskDate: new Date(result.taskDate),
          status:   'Pending',
        });
        this._recompute();
      }
    });
  }

   // ── Edit ──────────────────────────────────────────────
  openEditDialog(task: DailyTodoItem): void {
    const ref = this.dialog.open(AddDailyTodoDailogComponent, {
      width: '500px',
      maxWidth: '95vw',
      panelClass: 'todo-dialog-panel',
      disableClose: false,
      data: { id: task.id, title: task.title, detail: task.detail } as DailyDialogData,
    });

    ref.afterClosed().subscribe((result?: Partial<DailyTodoItem>) => {
      if (result?.title?.trim()) {
        task.title  = result.title.trim();
        task.detail = result.detail?.trim() ?? '';
        this._recompute();
      }
    });
  }

  // ── Toggle ────────────────────────────────────────────
  toggleComplete(task: DailyTodoItem, checked: boolean): void {
    task.status = checked ? 'Completed' : 'Pending';
    this._recompute();
  }

  // ── Delete ────────────────────────────────────────────
  deleteTask(id: number): void {
    this.tasks = this.tasks.filter(t => t.id !== id);
    this._recompute();
  }

  openMoveDialog(task: DailyTodoItem): void {
    const ref = this.dialog.open(TaskMoveAlertDailogComponent, {
      width: '520px',
      maxWidth: '95vw',
      panelClass: 'todo-dialog-panel',
      disableClose: false,
      data: task,
    });

    ref.afterClosed().subscribe((result?: Partial<DailyTodoItem>) => {
      if (result?.taskDate) {
        task.taskDate = new Date(result.taskDate);
        this._recompute();
      }
    });
  }

  showOverdueIcon(task: DailyTodoItem): boolean {
    if (task.status !== 'Pending') return false;
    const today = new Date();
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return new Date(task.taskDate).getTime() < startOfToday.getTime();
  }
}
