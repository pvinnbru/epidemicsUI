import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadFromPcComponent } from './upload-from-pc.component';

describe('UploadFromPcComponent', () => {
  let component: UploadFromPcComponent;
  let fixture: ComponentFixture<UploadFromPcComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadFromPcComponent]
    });
    fixture = TestBed.createComponent(UploadFromPcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
