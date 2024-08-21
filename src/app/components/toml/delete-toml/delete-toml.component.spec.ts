import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTomlComponent } from './delete-toml.component';

describe('DeleteTomlComponent', () => {
  let component: DeleteTomlComponent;
  let fixture: ComponentFixture<DeleteTomlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteTomlComponent]
    });
    fixture = TestBed.createComponent(DeleteTomlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
