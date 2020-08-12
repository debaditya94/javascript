import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestorSignUpComponent } from './investor-sign-up.component';

describe('InvestorSignUpComponent', () => {
  let component: InvestorSignUpComponent;
  let fixture: ComponentFixture<InvestorSignUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestorSignUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestorSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
