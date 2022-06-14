import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TCRatingComponent } from './rating.component';

describe('TCRatingComponent', () => {
  let component: TCRatingComponent;
  let fixture: ComponentFixture<TCRatingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TCRatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TCRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
