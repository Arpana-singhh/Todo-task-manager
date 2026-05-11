import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDailyTodoDailogComponent } from './add-daily-todo-dailog.component';

describe('AddDailyTodoDailogComponent', () => {
  let component: AddDailyTodoDailogComponent;
  let fixture: ComponentFixture<AddDailyTodoDailogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDailyTodoDailogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDailyTodoDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
