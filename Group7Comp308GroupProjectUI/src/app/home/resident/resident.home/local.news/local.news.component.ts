import { ChangeDetectorRef, Component, OnDestroy, OnInit, signal, ViewChild, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LocalNewsPost } from '../../../../models/Resident';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogRef } from '@angular/cdk/dialog';
import { AddNewsComponent } from './add.news/add.news.component';
import { ResidentService } from '../../../../services/resident.service/resident.service.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-local.news',
  imports: [
    ReactiveFormsModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    DatePipe,
    MatIconModule
  ],
  templateUrl: './local.news.component.html',
  styleUrl: './local.news.component.scss'
})
export class LocalNewsComponent implements OnInit, OnDestroy {

  postsSignal : WritableSignal<LocalNewsPost[]>
  #destroyed$ : Subject<null>

  constructor(private fb: FormBuilder, private dialog : MatDialog, private residentService: ResidentService) {
    this.postsSignal = signal([])
    this.#destroyed$ = new Subject<null>()
  }

  ngOnInit(): void {
    this.residentService.getAllLocalResidentNews().pipe(
      takeUntil(this.#destroyed$)
    ).subscribe((localNewsList) => {
      this.postsSignal.set(localNewsList)
    })
  }

  ngOnDestroy(): void {
    this.#destroyed$.next(null)
  }

  onAddNewsClicked() {
    this.dialog.open(AddNewsComponent)
  }

}

