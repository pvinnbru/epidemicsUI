import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfectionRateComponent } from './infection-rate.component';

describe('InfectionRateComponent', () => {
  let component: InfectionRateComponent;
  let fixture: ComponentFixture<InfectionRateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfectionRateComponent]
    });
    fixture = TestBed.createComponent(InfectionRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
