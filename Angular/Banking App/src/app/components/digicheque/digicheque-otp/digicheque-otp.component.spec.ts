import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DigichequeOtpComponent } from './digicheque-otp.component';

describe('DigichequeOtpComponent', () => {
  let component: DigichequeOtpComponent;
  let fixture: ComponentFixture<DigichequeOtpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DigichequeOtpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DigichequeOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
