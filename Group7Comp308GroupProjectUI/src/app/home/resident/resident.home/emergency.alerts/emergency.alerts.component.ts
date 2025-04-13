import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../../../../services/auth.service/auth.service';
import { EmergencyAlerts } from '../../../../models/Resident';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { ResidentService } from '../../../../services/resident.service/resident.service.service';
import { AddEmergencyAlertComponent } from './add.emergency.alert/add.emergency.alert.component';

@Component({
  selector: 'app-emergency.alerts',
  imports: [
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    DatePipe,
    MatIconModule
  ],
  templateUrl: './emergency.alerts.component.html',
  styleUrl: './emergency.alerts.component.scss'
})
export class EmergencyAlertsComponent implements OnInit, OnDestroy {
  
  authService: AuthService
  allAlerts: WritableSignal<EmergencyAlerts[]>
  #destroyed$: Subject<void>

  constructor(authService: AuthService, private dialog: MatDialog, private residentService: ResidentService) {
    this.authService = authService
    this.allAlerts = signal([])
    this.#destroyed$ = new Subject<void>()
  }

  ngOnInit(): void {
    this.residentService.getAllEmergencyAlerts().pipe(
      takeUntil(this.#destroyed$)
    ).subscribe((value) => {
      this.allAlerts.set(value)
    })
  }

  ngOnDestroy(): void {
    this.#destroyed$.next()
  }

  onAddAlert() {
    this.dialog.open(AddEmergencyAlertComponent)
  }

}
