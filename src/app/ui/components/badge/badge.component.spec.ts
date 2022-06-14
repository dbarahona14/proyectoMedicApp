import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TCBadgeComponent } from './badge.component';

describe('TCBadgeComponent', () => {
  let component: TCBadgeComponent;
  let fixture: ComponentFixture<TCBadgeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TCBadgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TCBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
