import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestPrescriptionComponent } from './latest-prescription.component';

describe('LatestPrescriptionComponent', () => {
  let component: LatestPrescriptionComponent;
  let fixture: ComponentFixture<LatestPrescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LatestPrescriptionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestPrescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
