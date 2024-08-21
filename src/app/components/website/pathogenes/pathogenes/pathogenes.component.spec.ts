import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PathogenesComponent } from './pathogenes.component';

describe('PathogenesComponent', () => {
  let component: PathogenesComponent;
  let fixture: ComponentFixture<PathogenesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PathogenesComponent]
    });
    fixture = TestBed.createComponent(PathogenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
