import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartConditionComponent } from './start-condition.component';

describe('StartConditionComponent', () => {
  let component: StartConditionComponent;
  let fixture: ComponentFixture<StartConditionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StartConditionComponent]
    });
    fixture = TestBed.createComponent(StartConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
