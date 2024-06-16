import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NinthclassDetailComponent } from './ninthclass-detail.component';

describe('NinthclassDetailComponent', () => {
  let component: NinthclassDetailComponent;
  let fixture: ComponentFixture<NinthclassDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NinthclassDetailComponent]
    });
    fixture = TestBed.createComponent(NinthclassDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
