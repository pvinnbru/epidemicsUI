import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormIntComponent } from './form-int.component';

describe('FormIntComponent', () => {
  let component: FormIntComponent;
  let fixture: ComponentFixture<FormIntComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormIntComponent]
    });
    fixture = TestBed.createComponent(FormIntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
