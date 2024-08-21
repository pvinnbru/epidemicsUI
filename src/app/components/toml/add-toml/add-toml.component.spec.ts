import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTomlComponent } from './add-toml.component';

describe('AddTomlComponent', () => {
  let component: AddTomlComponent;
  let fixture: ComponentFixture<AddTomlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddTomlComponent]
    });
    fixture = TestBed.createComponent(AddTomlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
