import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartUpLandingComponent } from './start-up-landing.component';

describe('StartUpLandingComponent', () => {
  let component: StartUpLandingComponent;
  let fixture: ComponentFixture<StartUpLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartUpLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartUpLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
