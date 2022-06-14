import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TCInputComponent } from './input.component';

describe('TCInputComponent', () => {
  let component: TCInputComponent;
  let fixture: ComponentFixture<TCInputComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TCInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TCInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
