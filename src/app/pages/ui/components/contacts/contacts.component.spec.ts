import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PageContactsComponent } from './contacts.component';

describe('PageContactsComponent', () => {
  let component: PageContactsComponent;
  let fixture: ComponentFixture<PageContactsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PageContactsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
