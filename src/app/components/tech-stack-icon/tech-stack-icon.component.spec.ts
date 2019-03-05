import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechStackIconComponent } from './tech-stack-icon.component';

describe('TechStackIconComponent', () => {
  let component: TechStackIconComponent;
  let fixture: ComponentFixture<TechStackIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechStackIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechStackIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
