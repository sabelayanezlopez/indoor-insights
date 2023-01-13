import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorsFunnelComponent } from './visitors-funnel.component';

describe('VisitorsFunnelComponent', () => {
  let component: VisitorsFunnelComponent;
  let fixture: ComponentFixture<VisitorsFunnelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitorsFunnelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisitorsFunnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
