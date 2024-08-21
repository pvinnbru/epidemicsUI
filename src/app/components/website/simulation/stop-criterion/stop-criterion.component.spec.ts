import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StopCriterionComponent } from './stop-criterion.component';

describe('StopCriterionComponent', () => {
  let component: StopCriterionComponent;
  let fixture: ComponentFixture<StopCriterionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StopCriterionComponent]
    });
    fixture = TestBed.createComponent(StopCriterionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
