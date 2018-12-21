import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatingBorderPageComponent } from './floating-border-page.component';

describe('FloatingBorderPageComponent', () => {
  let component: FloatingBorderPageComponent;
  let fixture: ComponentFixture<FloatingBorderPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FloatingBorderPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FloatingBorderPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
