import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskAlertDialogComponent } from './task-alert-dialog.component';

describe('TaskAlertDialogComponent', () => {
  let component: TaskAlertDialogComponent;
  let fixture: ComponentFixture<TaskAlertDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskAlertDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskAlertDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
