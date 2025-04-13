import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NeighborhoodHelpPost } from '../../../../models/Resident';
import { map, Subject, takeUntil } from 'rxjs';
import { ResidentService } from '../../../../services/resident.service/resident.service.service';
import { DialogRef } from '@angular/cdk/dialog';
import { AddNeighborhoodHelpComponent } from './add.neighborhood.help/add.neighborhood.help/add.neighborhood.help.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../../services/auth.service/auth.service';

@Component({
  selector: 'app-neighborhood.help',
  imports: [
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    DatePipe,
    MatIconModule
  ],
  templateUrl: './neighborhood.help.component.html',
  styleUrl: './neighborhood.help.component.scss'
})
export class NeighborhoodHelpComponent implements OnInit, OnDestroy {

  authService: AuthService
  neighborhoodHelpRequests: WritableSignal<NeighborhoodHelpPost[]>
  #destroyed$: Subject<void>

  constructor(private residentService: ResidentService, private dialog: MatDialog, authService: AuthService) {
    this.neighborhoodHelpRequests = signal([])
    this.#destroyed$ = new Subject<void>()
    this.authService = authService
  }

  ngOnInit(): void {
    this.residentService.getAllNeighborhoodNewsPost().pipe(
      takeUntil(this.#destroyed$),
    ).subscribe(value => {
      this.neighborhoodHelpRequests.set(value)
    })
  }

  ngOnDestroy(): void {
    this.#destroyed$.next()
  }

  onAddNeighborhoodHelpClicked() {
    this.dialog.open(AddNeighborhoodHelpComponent)
  }

} 
