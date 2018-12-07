import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageTransitionsComponent } from './page-transitions.component';

describe('PageTransitionsComponent', () => {
  let component: PageTransitionsComponent;
  let fixture: ComponentFixture<PageTransitionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageTransitionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageTransitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
