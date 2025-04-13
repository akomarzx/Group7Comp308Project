import { Component, inject, OnDestroy, OnInit, signal, Signal, WritableSignal } from '@angular/core';
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

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  readonly chipInputControl = new FormControl<string[] | null>(null);
  
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
      interests: this.fb.nonNullable.control<string[]>([], [Validators.required]),
      address: this.fb.nonNullable.control<string>('', [Validators.required])
    });

    this.interestEntered = signal([])
  }

  ngOnInit(): void {
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
          let user : User = {
            username: "Ronald",
            accessToken: "adagasdasd",
            role: Role.RESIDENT,
            interests: [],
            address: "Test address"
          }
          this.userSecService.storeUser(user)
          this.router.navigate(['home'])
      },
      error: (error) => {
        this.message.set(error.error)
      }
    })
  }

  onRegistrationSubmit() {
    this.userSecService.registerUser(this.registrationForm.controls['username'].value, this.registrationForm.controls['password'].value).subscribe({
      next: (result) => {
        this.message.set("Registration Successful")
        this.currentTabIndex = 0
        this.loginForm.patchValue(this.registrationForm.getRawValue())
      },
      error: (error) => {
        this.message.set(`Registration Failed - ${error?.description}`)
      }
    })
  }

  onTabchange() {
    this.loginForm.reset();
    this.loginForm.markAsUntouched()
    this.registrationForm.reset();
    this.registrationForm.markAsUntouched()
    this.message.set('');
  }

  remove(obj: { name: string }): void {
    this.interestEntered.update(interestList => {
      return interestList.filter((value) => value.name !== obj.name)
    })
  }

  onAddInterests(input : string) {
    this.interestEntered.update((values) => [...values, {name:input, id: this.interestEntered().length + 1}])
  }

}
