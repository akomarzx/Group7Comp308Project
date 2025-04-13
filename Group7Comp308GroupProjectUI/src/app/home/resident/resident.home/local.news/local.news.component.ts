import {
  Component,
  OnDestroy,
  OnInit,
  signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LocalNewsPost } from '../../../../models/Resident';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { AddNewsComponent } from './add.news/add.news.component';
import { ResidentService } from '../../../../services/resident.service/resident.service.service';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../../../services/auth.service/auth.service';

@Component({
  selector: 'app-local.news',
  imports: [
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    DatePipe,
    MatIconModule,
  ],
  templateUrl: './local.news.component.html',
  styleUrl: './local.news.component.scss',
})
export class LocalNewsComponent implements OnInit, OnDestroy {
  postsSignal: WritableSignal<LocalNewsPost[]>;
  #destroyed$: Subject<void>;

  authService: AuthService;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private residentService: ResidentService,
    authService: AuthService
  ) {
    this.postsSignal = signal([]);
    this.#destroyed$ = new Subject<void>();
    this.authService = authService;
  }

  ngOnInit(): void {
    this.residentService
      .getAllLocalResidentNews()
      .pipe(takeUntil(this.#destroyed$))
      .subscribe({
        next: (localNewsList) => {
          console.log(localNewsList);
          this.postsSignal.set(localNewsList);
        },
        error: (err) => {
          const gqlError = err?.graphQLErrors?.[0]?.message;
          const networkErrorMessage = err?.networkError?.error?.errors?.[0]?.message;
          const fallback = err?.message || 'An unknown error occurred';
          const errorMessage = gqlError || networkErrorMessage || fallback;
          alert(errorMessage);
          console.error('[Apollo Error]', err);
        }
      });
  }

  ngOnDestroy(): void {
    this.#destroyed$.next();
  }

  onAddNewsClicked() {
    this.dialog.open(AddNewsComponent);
  }
}
