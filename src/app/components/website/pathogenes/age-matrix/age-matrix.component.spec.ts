import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgeMatrixComponent } from './age-matrix.component';

describe('AgeMatrixComponent', () => {
  let component: AgeMatrixComponent;
  let fixture: ComponentFixture<AgeMatrixComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgeMatrixComponent]
    });
    fixture = TestBed.createComponent(AgeMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
