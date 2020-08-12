import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InnovHelpComponent } from './innov-help.component';

describe('InnovHelpComponent', () => {
  let component: InnovHelpComponent;
  let fixture: ComponentFixture<InnovHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InnovHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InnovHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
