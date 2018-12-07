import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrigginCoffeeComponent } from './friggin-coffee.component';

describe('FrigginCoffeeComponent', () => {
  let component: FrigginCoffeeComponent;
  let fixture: ComponentFixture<FrigginCoffeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrigginCoffeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrigginCoffeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
