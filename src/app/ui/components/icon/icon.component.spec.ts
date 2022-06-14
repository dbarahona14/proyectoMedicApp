import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TCIconComponent } from './icon.component';

describe('TCIconComponent', () => {
  let component: TCIconComponent;
  let fixture: ComponentFixture<TCIconComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TCIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TCIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
