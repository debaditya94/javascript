import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestorInvestmentsComponent } from './investor-investments.component';

describe('InvestorInvestmentsComponent', () => {
  let component: InvestorInvestmentsComponent;
  let fixture: ComponentFixture<InvestorInvestmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestorInvestmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestorInvestmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
