import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineMessageComponent } from './medicine-message.component';

describe('MedicineMessageComponent', () => {
  let component: MedicineMessageComponent;
  let fixture: ComponentFixture<MedicineMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MedicineMessageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicineMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
