import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TCCheckboxComponent } from './checkbox.component';

describe('TCCheckboxComponent', () => {
  let component: TCCheckboxComponent;
  let fixture: ComponentFixture<TCCheckboxComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TCCheckboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TCCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
