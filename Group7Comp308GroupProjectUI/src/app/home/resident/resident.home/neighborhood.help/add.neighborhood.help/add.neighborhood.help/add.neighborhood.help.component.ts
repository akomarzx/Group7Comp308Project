import { Component, ElementRef, signal, ViewChild, WritableSignal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ResidentService } from '../../../../../../services/resident.service/resident.service.service';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../../../../../services/auth.service/auth.service';
import { NeighborhoodHelpPost } from '../../../../../../models/Resident';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-add.neighborhood.help',
  imports: [
    ReactiveFormsModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule
  ],
  templateUrl: './add.neighborhood.help.component.html',
  styleUrl: './add.neighborhood.help.component.scss',
})
export class AddNeighborhoodHelpComponent {
  
  postForm!: FormGroup;
  interestEntered: WritableSignal<{ id : number, name: string }[]>

  @ViewChild("interestInput") interestInputControl : ElementRef | undefined

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    private fb: FormBuilder,
    private residentService: ResidentService,
    private dialogRef: MatDialogRef<AddNeighborhoodHelpComponent>,
    private authService: AuthService
  ) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      interests: this.fb.nonNullable.control<string[]>([]),
      location: this.fb.nonNullable.control<string>('', [Validators.required])
    });

    this.interestEntered = signal([])

  }

  onSubmit() {
    if (this.postForm.valid) {
      
      const formValue = this.postForm.value;

      const newNeigbhorhoodPost: NeighborhoodHelpPost = {
        ...formValue,
        username: this.authService.currentUser?.username,
        timestamp: new Date(),
      };

      console.log(newNeigbhorhoodPost)

      this.dialogRef.close();
    }
  }

  remove(obj: { name: string }): void {
    this.interestEntered.update(interestList => {
      return interestList.filter((value) => value.name !== obj.name);
    })
  }

  onAddInterests(input : string) {
    this.interestEntered.update((values) => [...values, {name:input, id: this.interestEntered().length + 1}]);
    let inputControl = this.interestInputControl?.nativeElement as HTMLInputElement;
    inputControl.value = '';
  }
}
