import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestorLandingComponent } from './investor-landing.component';

describe('InvestorLandingComponent', () => {
  let component: InvestorLandingComponent;
  let fixture: ComponentFixture<InvestorLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestorLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestorLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
