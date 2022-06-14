import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PageSelectsComponent } from './selects.component';

describe('PageSelectsComponent', () => {
  let component: PageSelectsComponent;
  let fixture: ComponentFixture<PageSelectsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PageSelectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageSelectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
