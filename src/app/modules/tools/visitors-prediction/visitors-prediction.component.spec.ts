import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorsPredictionComponent } from './visitors-prediction.component';

describe('VisitorsPredictionComponent', () => {
  let component: VisitorsPredictionComponent;
  let fixture: ComponentFixture<VisitorsPredictionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitorsPredictionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisitorsPredictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
