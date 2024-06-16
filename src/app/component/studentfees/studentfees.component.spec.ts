import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentfeesComponent } from './studentfees.component';

describe('StudentfeesComponent', () => {
  let component: StudentfeesComponent;
  let fixture: ComponentFixture<StudentfeesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentfeesComponent]
    });
    fixture = TestBed.createComponent(StudentfeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
