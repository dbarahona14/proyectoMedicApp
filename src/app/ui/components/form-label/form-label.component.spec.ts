import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TCFormLabelComponent } from './form-label.component';

describe('TCFormLabelComponent', () => {
  let component: TCFormLabelComponent;
  let fixture: ComponentFixture<TCFormLabelComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TCFormLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TCFormLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
