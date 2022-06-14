import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PageInputsComponent } from './inputs.component';

describe('PageInputsComponent', () => {
  let component: PageInputsComponent;
  let fixture: ComponentFixture<PageInputsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PageInputsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageInputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
