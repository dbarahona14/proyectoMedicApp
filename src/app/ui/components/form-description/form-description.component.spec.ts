import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TCFormDescriptionComponent } from './form-description.component';

describe('TCFormDescriptionComponent', () => {
  let component: TCFormDescriptionComponent;
  let fixture: ComponentFixture<TCFormDescriptionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TCFormDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TCFormDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
