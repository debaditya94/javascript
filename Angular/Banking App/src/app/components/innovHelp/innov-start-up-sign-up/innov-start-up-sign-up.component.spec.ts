import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InnovStartUpSignUpComponent } from './innov-start-up-sign-up.component';

describe('InnovStartUpSignUpComponent', () => {
  let component: InnovStartUpSignUpComponent;
  let fixture: ComponentFixture<InnovStartUpSignUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InnovStartUpSignUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InnovStartUpSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
