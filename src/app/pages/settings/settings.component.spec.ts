import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PageSettingsComponent } from './settings.component';

describe('PageSettingsComponent', () => {
  let component: PageSettingsComponent;
  let fixture: ComponentFixture<PageSettingsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PageSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
