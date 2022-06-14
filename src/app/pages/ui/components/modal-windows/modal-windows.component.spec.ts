import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PageModalWindowsComponent } from './modal-windows.component';

describe('PageModalWindowsComponent', () => {
  let component: PageModalWindowsComponent;
  let fixture: ComponentFixture<PageModalWindowsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PageModalWindowsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageModalWindowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
