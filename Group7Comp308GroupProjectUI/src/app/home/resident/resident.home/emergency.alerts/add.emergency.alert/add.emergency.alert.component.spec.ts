import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmergencyAlertComponent } from './add.emergency.alert.component';

describe('AddEmergencyAlertComponent', () => {
  let component: AddEmergencyAlertComponent;
  let fixture: ComponentFixture<AddEmergencyAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEmergencyAlertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEmergencyAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
