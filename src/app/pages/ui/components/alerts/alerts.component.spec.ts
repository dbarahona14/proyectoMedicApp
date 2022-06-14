import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PageAlertsComponent } from './alerts.component';

describe('PageAlertsComponent', () => {
  let component: PageAlertsComponent;
  let fixture: ComponentFixture<PageAlertsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PageAlertsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageAlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
