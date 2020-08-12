import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DcinfoComponent } from './dcinfo.component';

describe('DcinfoComponent', () => {
  let component: DcinfoComponent;
  let fixture: ComponentFixture<DcinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DcinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DcinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
