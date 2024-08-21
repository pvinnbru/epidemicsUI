import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CurrentUserWindowComponent } from './current-user-window.component';

describe('CurrentUserWindowComponent', () => {
  let component: CurrentUserWindowComponent;
  let fixture: ComponentFixture<CurrentUserWindowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurrentUserWindowComponent]
    });
    fixture = TestBed.createComponent(CurrentUserWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
