import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescriptionSucccessMessageComponent } from './prescription-succcess-message.component';

describe('PrescriptionSucccessMessageComponent', () => {
  let component: PrescriptionSucccessMessageComponent;
  let fixture: ComponentFixture<PrescriptionSucccessMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PrescriptionSucccessMessageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrescriptionSucccessMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
