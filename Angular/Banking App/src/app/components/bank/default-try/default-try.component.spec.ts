import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultTryComponent } from './default-try.component';

describe('DefaultTryComponent', () => {
  let component: DefaultTryComponent;
  let fixture: ComponentFixture<DefaultTryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefaultTryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultTryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
