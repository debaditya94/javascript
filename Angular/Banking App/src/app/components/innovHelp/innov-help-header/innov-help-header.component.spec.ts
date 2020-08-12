import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InnovHelpHeaderComponent } from './innov-help-header.component';

describe('InnovHelpHeaderComponent', () => {
  let component: InnovHelpHeaderComponent;
  let fixture: ComponentFixture<InnovHelpHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InnovHelpHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InnovHelpHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
