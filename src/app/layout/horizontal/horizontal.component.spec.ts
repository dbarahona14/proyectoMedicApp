import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HorizontalLayoutComponent } from './horizontal.component';

describe('HorizontalLayoutComponent', () => {
  let component: HorizontalLayoutComponent;
  let fixture: ComponentFixture<HorizontalLayoutComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HorizontalLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorizontalLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
