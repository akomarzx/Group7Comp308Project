import { ChangeDetectorRef, Component, signal, ViewChild, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Post } from '../../../../models/Resident';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-local.news',
  imports: [
    ReactiveFormsModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    DatePipe
  ],
  templateUrl: './local.news.component.html',
  styleUrl: './local.news.component.scss'
})
export class LocalNewsComponent {

  posts: Post[] = [
    {
      user: 'JaneDoe123',
      title: 'Road Construction on Main St.',
      content: 'Expect delays this week due to construction near the downtown intersection.',
      timestamp: new Date()
    },
    {
      user: 'LocalDad88',
      title: 'Community BBQ This Saturday!',
      content: 'Everyone is welcome at the park for food and fun. Starts at 2pm!',
      timestamp: new Date()
    }
  ];
  
  @ViewChild('formDirective') private formDirective: FormGroupDirective | undefined;

  postsSignal : WritableSignal<Post[]> = signal(this.posts)

  postForm!: FormGroup;

  constructor(private fb: FormBuilder, private cdRef : ChangeDetectorRef) {}

  ngOnInit(): void {
    this.postForm = this.fb.group({
      user: ['', Validators.required],
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  postUpdate() {

    if (this.postForm.valid) {

      const formValue = this.postForm.value;

      this.postsSignal.update((currentVal) => {
        return [...currentVal,  {
          ...formValue,
          timestamp: new Date()
        }]
      })
      
      this.postForm.reset()

      Object.keys(this.postForm.controls).forEach(controlName => {
        const control = this.postForm.get(controlName);
        control?.markAsPristine();
        control?.markAsUntouched();
        control?.setErrors(null);
      });
    
      this.postForm.updateValueAndValidity(); // Ensure UI updates

    }
  }
}

