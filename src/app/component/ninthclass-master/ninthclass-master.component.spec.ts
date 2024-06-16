import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NinthclassMasterComponent } from './ninthclass-master.component';

describe('NinthclassMasterComponent', () => {
  let component: NinthclassMasterComponent;
  let fixture: ComponentFixture<NinthclassMasterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NinthclassMasterComponent]
    });
    fixture = TestBed.createComponent(NinthclassMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
