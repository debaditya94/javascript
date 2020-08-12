import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentSuccessComponent } from './investment-success.component';

describe('InvestmentSuccessComponent', () => {
  let component: InvestmentSuccessComponent;
  let fixture: ComponentFixture<InvestmentSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestmentSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
