import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotDistributionsComponent } from './plot-distributions.component';

describe('PlotDistributionsComponent', () => {
  let component: PlotDistributionsComponent;
  let fixture: ComponentFixture<PlotDistributionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlotDistributionsComponent]
    });
    fixture = TestBed.createComponent(PlotDistributionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
