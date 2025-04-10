import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergencyAlertsComponent } from './emergency.alerts.component';

describe('EmergencyAlertsComponent', () => {
  let component: EmergencyAlertsComponent;
  let fixture: ComponentFixture<EmergencyAlertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmergencyAlertsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmergencyAlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
