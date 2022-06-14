import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TCFormGroupComponent } from './form-group.component';

describe('TCFormGroupComponent', () => {
  let component: TCFormGroupComponent;
  let fixture: ComponentFixture<TCFormGroupComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TCFormGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TCFormGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
