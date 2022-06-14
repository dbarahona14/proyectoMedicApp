import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TCButtonComponent } from './button.component';

describe('TCButtonComponent', () => {
  let component: TCButtonComponent;
  let fixture: ComponentFixture<TCButtonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TCButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TCButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
