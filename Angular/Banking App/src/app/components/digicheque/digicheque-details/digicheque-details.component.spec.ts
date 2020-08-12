import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DigichequeDetailsComponent } from './digicheque-details.component';

describe('DigichequeDetailsComponent', () => {
  let component: DigichequeDetailsComponent;
  let fixture: ComponentFixture<DigichequeDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DigichequeDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DigichequeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
