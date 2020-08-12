import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PitchedStartupsComponent } from './pitched-startups.component';

describe('PitchedStartupsComponent', () => {
  let component: PitchedStartupsComponent;
  let fixture: ComponentFixture<PitchedStartupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PitchedStartupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PitchedStartupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
