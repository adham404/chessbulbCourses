import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseStreamingComponent } from './course-streaming.component';

describe('CourseStreamingComponent', () => {
  let component: CourseStreamingComponent;
  let fixture: ComponentFixture<CourseStreamingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseStreamingComponent]
    });
    fixture = TestBed.createComponent(CourseStreamingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
