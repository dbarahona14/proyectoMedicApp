import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PageEditAccountComponent } from './edit-account.component';

describe('PageEditAccountComponent', () => {
  let component: PageEditAccountComponent;
  let fixture: ComponentFixture<PageEditAccountComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PageEditAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageEditAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
