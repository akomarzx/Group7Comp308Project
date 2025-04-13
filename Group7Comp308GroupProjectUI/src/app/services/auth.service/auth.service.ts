import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, exhaustMap } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { LOGIN_USER, REGISTER_USER } from './auth.graphql';
import { RegisterUserRequest, Role, User } from '../../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: BehaviorSubject<User | null>;

  get currentUser(): User | null {
    return this.user.getValue();
  }

  constructor(private apollo: Apollo) {
    this.user = new BehaviorSubject<User | null>(null);
  }

  authenticateUser(username: string, password: string): Observable<User> {
    return of({ username, password }).pipe(
      exhaustMap(credentials =>
        this.apollo.mutate<{ login: User }>({
          mutation: LOGIN_USER,
          variables: credentials
        }).pipe(
          map(result => {
            const user = result.data?.login!;
            this.user.next(user);
            return user;
          })
        )
      )
    );
  }

  isAuthenticated(): boolean {
    return this.user.getValue() != null;
  }

  storeUser(authenticatedUser: User) {
    localStorage.setItem('accessToken', authenticatedUser.accessToken);
    this.user.next(authenticatedUser);
  }

  registerUser(registerUserRequest: RegisterUserRequest): Observable<User> {
    return of(registerUserRequest).pipe(
      exhaustMap(req =>
        this.apollo.mutate<{ register: User }>({
          mutation: REGISTER_USER,
          variables: req
        }).pipe(
          map(result => {
            const user = result.data?.register!;
            this.user.next(user);
            return user;
          })
        )
      )
    );
  }

  isAuthorized(role: string): boolean {
    return this.currentUser?.role === (role as Role);
  }
}
