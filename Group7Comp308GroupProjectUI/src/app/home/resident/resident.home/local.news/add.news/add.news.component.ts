import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LocalNewsPost } from '../../../../../models/Resident';
import { ResidentService } from '../../../../../services/resident.service/resident.service.service';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../../../../services/auth.service/auth.service';

@Component({
  selector: 'app-add.news',
  imports: [
    ReactiveFormsModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './add.news.component.html',
  styleUrl: './add.news.component.scss'
})
export class AddNewsComponent {

  postForm!: FormGroup;

  constructor(private fb : FormBuilder, 
              private residentService : ResidentService, 
              private dialogRef : MatDialogRef<AddNewsComponent>,
              private authService : AuthService){

    this.postForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {

    if (this.postForm.valid) {
      
      const formValue = this.postForm.value;
      
      const newNews : LocalNewsPost = {
        ...formValue,
        user: this.authService.currentUser?.username,
        timestamp: new Date()
      }
      
      this.residentService.addNewLocalNews(newNews);
      this.dialogRef.close()

    }
  }
}
