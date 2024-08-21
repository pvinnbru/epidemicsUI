import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTomlDialogComponent } from './add-toml-dialog.component';

describe('AddTomlDialogComponent', () => {
  let component: AddTomlDialogComponent;
  let fixture: ComponentFixture<AddTomlDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddTomlDialogComponent]
    });
    fixture = TestBed.createComponent(AddTomlDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
