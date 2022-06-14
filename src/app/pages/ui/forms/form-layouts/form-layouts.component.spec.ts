import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PageFormLayoutsComponent } from './form-layouts.component';

describe('PageFormLayoutsComponent', () => {
  let component: PageFormLayoutsComponent;
  let fixture: ComponentFixture<PageFormLayoutsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PageFormLayoutsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageFormLayoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
