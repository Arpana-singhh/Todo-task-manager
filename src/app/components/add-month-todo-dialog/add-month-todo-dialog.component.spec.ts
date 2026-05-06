import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMonthTodoDialogComponent } from './add-month-todo-dialog.component';

describe('AddMonthTodoDialogComponent', () => {
  let component: AddMonthTodoDialogComponent;
  let fixture: ComponentFixture<AddMonthTodoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddMonthTodoDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMonthTodoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
