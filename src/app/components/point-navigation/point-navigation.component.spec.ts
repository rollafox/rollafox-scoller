import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointNavigationComponent } from './point-navigation.component';

describe('PointNavigationComponent', () => {
  let component: PointNavigationComponent;
  let fixture: ComponentFixture<PointNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
