import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TCRadioOptionComponent } from './radio-option.component';

describe('TCRadioOptionComponent', () => {
  let component: TCRadioOptionComponent;
  let fixture: ComponentFixture<TCRadioOptionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TCRadioOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TCRadioOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
