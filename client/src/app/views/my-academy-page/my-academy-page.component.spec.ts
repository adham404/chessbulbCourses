import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAcademyPageComponent } from './my-academy-page.component';

describe('MyAcademyPageComponent', () => {
  let component: MyAcademyPageComponent;
  let fixture: ComponentFixture<MyAcademyPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyAcademyPageComponent]
    });
    fixture = TestBed.createComponent(MyAcademyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
