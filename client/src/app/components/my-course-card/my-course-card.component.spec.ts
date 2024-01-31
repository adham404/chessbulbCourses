import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCourseCardComponent } from './my-course-card.component';

describe('MyCourseCardComponent', () => {
  let component: MyCourseCardComponent;
  let fixture: ComponentFixture<MyCourseCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyCourseCardComponent]
    });
    fixture = TestBed.createComponent(MyCourseCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
