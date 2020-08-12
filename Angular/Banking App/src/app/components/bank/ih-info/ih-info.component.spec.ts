import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IhInfoComponent } from './ih-info.component';

describe('IhInfoComponent', () => {
  let component: IhInfoComponent;
  let fixture: ComponentFixture<IhInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IhInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IhInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
