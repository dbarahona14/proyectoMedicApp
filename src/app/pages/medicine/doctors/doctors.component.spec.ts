import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PageDoctorsComponent } from './doctors.component';

describe('PageDoctorsComponent', () => {
  let component: PageDoctorsComponent;
  let fixture: ComponentFixture<PageDoctorsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PageDoctorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageDoctorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
