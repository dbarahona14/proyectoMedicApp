import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NavbarSkeletonComponent } from './navbar-skeleton.component';

describe('NavbarSkeletonComponent', () => {
  let component: NavbarSkeletonComponent;
  let fixture: ComponentFixture<NavbarSkeletonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarSkeletonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
