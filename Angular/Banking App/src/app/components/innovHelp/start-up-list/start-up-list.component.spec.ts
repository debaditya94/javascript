import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartUpListComponent } from './start-up-list.component';

describe('StartUpListComponent', () => {
  let component: StartUpListComponent;
  let fixture: ComponentFixture<StartUpListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartUpListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartUpListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
