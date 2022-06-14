import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TCDropdownComponent } from './dropdown.component';

describe('TCDropdownComponent', () => {
  let component: TCDropdownComponent;
  let fixture: ComponentFixture<TCDropdownComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TCDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TCDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
