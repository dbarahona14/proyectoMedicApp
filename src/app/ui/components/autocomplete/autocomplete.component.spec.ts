import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TCAutocompleteComponent } from './autocomplete.component';

describe('TCAutocompleteComponent', () => {
  let component: TCAutocompleteComponent;
  let fixture: ComponentFixture<TCAutocompleteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TCAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TCAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
