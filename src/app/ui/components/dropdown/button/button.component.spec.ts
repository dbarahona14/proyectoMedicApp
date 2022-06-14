import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TCDropdownButtonComponent } from './button.component';

describe('TCDropdownButtonComponent', () => {
  let component: TCDropdownButtonComponent;
  let fixture: ComponentFixture<TCDropdownButtonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TCDropdownButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TCDropdownButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
