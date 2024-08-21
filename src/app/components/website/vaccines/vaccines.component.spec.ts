import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccinesComponent } from './vaccines.component';

describe('VaccinesComponent', () => {
  let component: VaccinesComponent;
  let fixture: ComponentFixture<VaccinesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VaccinesComponent]
    });
    fixture = TestBed.createComponent(VaccinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
