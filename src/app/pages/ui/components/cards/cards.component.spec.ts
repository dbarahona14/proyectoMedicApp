import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PageCardsComponent } from './cards.component';

describe('PageCardsComponent', () => {
  let component: PageCardsComponent;
  let fixture: ComponentFixture<PageCardsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PageCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
