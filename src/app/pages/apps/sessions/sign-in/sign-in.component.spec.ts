import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PageSignInComponent } from './sign-in.component';

describe('PageSignInComponent', () => {
  let component: PageSignInComponent;
  let fixture: ComponentFixture<PageSignInComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PageSignInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageSignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
