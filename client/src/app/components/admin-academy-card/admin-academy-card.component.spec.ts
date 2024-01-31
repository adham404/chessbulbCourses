import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAcademyCardComponent } from './admin-academy-card.component';

describe('AdminAcademyCardComponent', () => {
  let component: AdminAcademyCardComponent;
  let fixture: ComponentFixture<AdminAcademyCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAcademyCardComponent]
    });
    fixture = TestBed.createComponent(AdminAcademyCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
