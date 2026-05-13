import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskMoveAlertDailogComponent } from './task-move-alert-dailog.component';

describe('TaskMoveAlertDailogComponent', () => {
  let component: TaskMoveAlertDailogComponent;
  let fixture: ComponentFixture<TaskMoveAlertDailogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskMoveAlertDailogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskMoveAlertDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
