import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PageRadioButtonsComponent } from './radio-buttons.component';

describe('PageRadioButtonsComponent', () => {
  let component: PageRadioButtonsComponent;
  let fixture: ComponentFixture<PageRadioButtonsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PageRadioButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageRadioButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
