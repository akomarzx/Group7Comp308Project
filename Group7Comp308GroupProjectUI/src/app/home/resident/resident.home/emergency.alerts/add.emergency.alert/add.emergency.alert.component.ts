import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ResidentService } from '../../../../../services/resident.service/resident.service.service';
import { AuthService } from '../../../../../services/auth.service/auth.service';

export interface EmergencyAlerts {
  userId: string | null;
  username: string;
  title: string;
  location: string;
  timestamp: Date;
}

@Component({
  selector: 'app-add-alert',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './add.emergency.alert.component.html',
  styleUrl: './add.emergency.alert.component.scss',
})
export class AddEmergencyAlertComponent {

  alertForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private residentService: ResidentService,
    private dialogRef: MatDialogRef<AddEmergencyAlertComponent>,
    private authService: AuthService
  ) {
    this.alertForm = this.fb.group({
      title: ['', Validators.required],
      location: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.alertForm.valid) {
      const formValue = this.alertForm.value;

      const newAlert: EmergencyAlerts = {
        ...formValue,
        username: this.authService.currentUser?.username ?? 'Anonymous',
        userId: this.authService.currentUser?.userId ?? null,
        timestamp: new Date(),
      };

      this.residentService.addEmergencyAlert(newAlert).subscribe((value) => {
        console.log(value)
      });
      
      this.dialogRef.close();
    }
  }
}
