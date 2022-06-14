import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PageSignUpComponent } from './sign-up.component';

describe('PageSignUpComponent', () => {
  let component: PageSignUpComponent;
  let fixture: ComponentFixture<PageSignUpComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PageSignUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
