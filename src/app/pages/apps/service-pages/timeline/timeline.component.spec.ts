import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PageTimelineComponent } from './timeline.component';

describe('PageTimelineComponent', () => {
  let component: PageTimelineComponent;
  let fixture: ComponentFixture<PageTimelineComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PageTimelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
