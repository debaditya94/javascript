import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DigichequeConfirmationComponent } from './digicheque-confirmation.component';

describe('DigichequeConfirmationComponent', () => {
  let component: DigichequeConfirmationComponent;
  let fixture: ComponentFixture<DigichequeConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DigichequeConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DigichequeConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
