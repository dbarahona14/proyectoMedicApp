import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TCTextareaComponent } from './textarea.component';

describe('TCTextareaComponent', () => {
  let component: TCTextareaComponent;
  let fixture: ComponentFixture<TCTextareaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TCTextareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TCTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
