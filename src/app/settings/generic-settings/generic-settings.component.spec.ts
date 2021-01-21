import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericSettingsComponent } from './generic-settings.component';

describe('GenericSettingsComponent', () => {
  let component: GenericSettingsComponent;
  let fixture: ComponentFixture<GenericSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GenericSettingsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
