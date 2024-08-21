import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTomlDialogComponent } from './delete-toml-dialog.component';

describe('DeleteTomlDialogComponent', () => {
  let component: DeleteTomlDialogComponent;
  let fixture: ComponentFixture<DeleteTomlDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteTomlDialogComponent]
    });
    fixture = TestBed.createComponent(DeleteTomlDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
