import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiaryFormsComponent } from './beneficiary-forms.component';

describe('BeneficiaryFormsComponent', () => {
  let component: BeneficiaryFormsComponent;
  let fixture: ComponentFixture<BeneficiaryFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeneficiaryFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeneficiaryFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
