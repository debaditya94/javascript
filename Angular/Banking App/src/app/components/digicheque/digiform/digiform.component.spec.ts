import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DigiformComponent } from './digiform.component';

describe('DigiformComponent', () => {
  let component: DigiformComponent;
  let fixture: ComponentFixture<DigiformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DigiformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DigiformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
