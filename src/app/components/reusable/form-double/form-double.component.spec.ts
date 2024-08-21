import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDoubleComponent } from './form-double.component';

describe('FormDoubleComponent', () => {
  let component: FormDoubleComponent;
  let fixture: ComponentFixture<FormDoubleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormDoubleComponent]
    });
    fixture = TestBed.createComponent(FormDoubleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
