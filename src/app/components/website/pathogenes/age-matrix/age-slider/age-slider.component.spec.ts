import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgeSliderComponent } from './age-slider.component';

describe('AgeSliderComponent', () => {
  let component: AgeSliderComponent;
  let fixture: ComponentFixture<AgeSliderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgeSliderComponent]
    });
    fixture = TestBed.createComponent(AgeSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
