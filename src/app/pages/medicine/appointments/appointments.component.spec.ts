import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PageAppointmentsComponent } from './appointments.component';

describe('PageAppointmentsComponent', () => {
  let component: PageAppointmentsComponent;
  let fixture: ComponentFixture<PageAppointmentsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PageAppointmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
