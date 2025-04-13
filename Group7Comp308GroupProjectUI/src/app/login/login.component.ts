import { Component, ElementRef, inject, OnDestroy, OnInit, signal, Signal, ViewChild, WritableSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service/auth.service';
import { Router } from '@angular/router';
import { Role, User } from '../models/User';
import { MatChipsModule } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatToolbarModule,
    MatTabsModule,
    MatIconModule,
    ReactiveFormsModule,
    MatChipsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy{

  loginForm : FormGroup;
  registrationForm : FormGroup;
  message : WritableSignal<String>;
  currentTabIndex : number
  interestEntered: WritableSignal<{ id : number, name: string }[]>

  @ViewChild("interestInput") interestInputControl : ElementRef | undefined

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  
  constructor(private fb : FormBuilder, 
    private userSecService : AuthService, 
    private router : Router){

    this.message = signal('')
    this.currentTabIndex = 0

    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]
      ]
    });

    this.registrationForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]
      ],
      interests: this.fb.nonNullable.control<string[]>([]),
      address: this.fb.nonNullable.control<string>('', [Validators.required])
    });

    this.interestEntered = signal([])

  }

  ngOnInit(): void {

    if(this.userSecService.isAuthenticated()) {
      switch(this.userSecService.currentUser?.role) {
        case Role.RESIDENT: {
          this.router.navigate(['/home/resident'])
          break;
        } 
        case Role.BUSINESS_OWNER: {
          this.router.navigate(['/home/business'])
          break;
        }
        case Role.COMMUNITY_ORGANIZER: {
          this.router.navigate(['/home/community-organizer'])
          break
        }
      }

      return;
    }

    this.loginForm.patchValue({
      username: "test",
      password: "PasswordTest1!"
    })
  }

  ngOnDestroy(): void {
  }

  onLoginSubmit() {
    let username = this.loginForm.get('username')?.value
    let password = this.loginForm.get('password')?.value

    this.userSecService.authenticateUser(username, password).subscribe({
      next: (result: User) => {
          this.userSecService.storeUser(result)
          this.router.navigate(['home'])
      },
      error: (error) => {
        this.message.set(error.error)
      }
    })
  }

  onRegistrationSubmit() {

    console.log(this.registrationForm.value);
    
    this.userSecService.registerUser(this.registrationForm.value).subscribe({
      next: (result) => {
        this.userSecService.storeUser(result)
        this.router.navigate(['home'])
      },
      error: (error) => {
        this.message.set(`Registration Failed - ${error?.description}`)
      }
    })
  }

  onTabchange() {
    this.loginForm.reset();
    this.loginForm.markAsUntouched();
    this.registrationForm.reset();
    this.registrationForm.markAsUntouched();
    this.message.set('');
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
