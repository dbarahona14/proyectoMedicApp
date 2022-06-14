import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PageBadgesComponent } from './badges.component';

describe('PageBadgesComponent', () => {
  let component: PageBadgesComponent;
  let fixture: ComponentFixture<PageBadgesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PageBadgesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageBadgesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
