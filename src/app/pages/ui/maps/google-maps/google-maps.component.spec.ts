import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PageGoogleMapsComponent } from './google-maps.component';

describe('PageGoogleMapsComponent', () => {
  let component: PageGoogleMapsComponent;
  let fixture: ComponentFixture<PageGoogleMapsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PageGoogleMapsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageGoogleMapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
