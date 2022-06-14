import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PageButtonsComponent } from './buttons.component';

describe('PageButtonsComponent', () => {
  let component: PageButtonsComponent;
  let fixture: ComponentFixture<PageButtonsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PageButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
