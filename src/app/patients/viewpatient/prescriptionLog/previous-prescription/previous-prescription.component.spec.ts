import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousPrescriptionComponent } from './previous-prescription.component';

describe('PreviousPrescriptionComponent', () => {
  let component: PreviousPrescriptionComponent;
  let fixture: ComponentFixture<PreviousPrescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PreviousPrescriptionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviousPrescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
