import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TCCardComponent } from './card.component';

describe('TCCardComponent', () => {
  let component: TCCardComponent;
  let fixture: ComponentFixture<TCCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TCCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TCCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
