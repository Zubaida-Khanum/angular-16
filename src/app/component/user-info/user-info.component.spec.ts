import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserinfoComponent } from './user-info.component';

describe('UserInfoComponent', () => {
  let component: UserinfoComponent;
  let fixture: ComponentFixture<UserinfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserinfoComponent]
    });
    fixture = TestBed.createComponent(UserinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
