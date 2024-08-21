import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPercentComponent } from './form-percent.component';

describe('FormPercentComponent', () => {
  let component: FormPercentComponent;
  let fixture: ComponentFixture<FormPercentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormPercentComponent]
    });
    fixture = TestBed.createComponent(FormPercentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
