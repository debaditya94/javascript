import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PmsinfoComponent } from './pmsinfo.component';

describe('PmsinfoComponent', () => {
  let component: PmsinfoComponent;
  let fixture: ComponentFixture<PmsinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PmsinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PmsinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
