import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademiesComponent } from './academies.component';

describe('AcademiesComponent', () => {
  let component: AcademiesComponent;
  let fixture: ComponentFixture<AcademiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcademiesComponent]
    });
    fixture = TestBed.createComponent(AcademiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
