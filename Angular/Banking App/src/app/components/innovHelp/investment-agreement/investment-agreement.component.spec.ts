import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentAgreementComponent } from './investment-agreement.component';

describe('InvestmentAgreementComponent', () => {
  let component: InvestmentAgreementComponent;
  let fixture: ComponentFixture<InvestmentAgreementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestmentAgreementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
