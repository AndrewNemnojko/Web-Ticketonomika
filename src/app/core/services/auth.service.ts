import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  Observable,
  of,
  tap,
  throwError,
} from 'rxjs';
import { User } from '../../shared/models/user.model';
import { USER_MOCK } from '../../mocks/users.mock';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {
    this.getUser();
  }

  private _currentUser = new BehaviorSubject<User | null>(null);
  currentUser$ = this._currentUser.asObservable();

  private _isAuthenticated = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this._isAuthenticated.asObservable();

  getUser(): Observable<User | null> {
    console.log("AUTH.SERVICE - CALL GETUSER");

    const logoutLocal = localStorage.getItem('logoutTest');
    if (logoutLocal != null) {
      this._currentUser.next(null);
      this._isAuthenticated.next(false);
      console.log("AUTH.SERVICE - CALL GETUSER - UNAUTH (LOCAL FLAG)");
      return of(null);
    }

    const userMock = USER_MOCK;
    if (userMock) {
      this._currentUser.next(userMock);
      this._isAuthenticated.next(true);
      localStorage.setItem('currentUser', JSON.stringify(userMock));
      console.log("AUTH.SERVICE - CALL GETUSER - AUTH (MOCK");
      return of(userMock);
    }

    const userJson = localStorage.getItem('currentUser');
    if (userJson) {
      const user: User = JSON.parse(userJson);
      this._currentUser.next(user);
      this._isAuthenticated.next(true);
      return of(user);
    }

    return this.http.get<User>('/api/auth/me', { withCredentials: true }).pipe(
      tap((user) => {
        this._currentUser.next(user);
        this._isAuthenticated.next(true);
        localStorage.setItem('currentUser', JSON.stringify(user));
      }),
      catchError((err) => {
        if (err.status === 403) {
          this._currentUser.next(null);
          this._isAuthenticated.next(false);
          localStorage.removeItem('currentUser');
          return of(null);
        }
        return throwError(() => err);
      }),
    );
  }

  login(code: string): Observable<void> {
    console.log("AUTH.SERVICE - CALL LOGIN");
    return this.http
      .post<void>('/api/auth/login', { code }, { withCredentials: true })
      .pipe(
        tap(() => {
          this._isAuthenticated.next(true);
          console.log("AUTH.SERVICE - CALL LOGIN - 200");
        }),
        catchError((err) => {        
            console.log("AUTH.SERVICE - CALL LOGIN - 500/200 (MOCK USE)");
            this._isAuthenticated.next(true);
            localStorage.removeItem('logoutTest');           
          return throwError(() => err);
        }),
      );
  }

  logout(): void {
    console.log("AUTH.SERVICE - LOGOUT");
    this.http
      .post('/api/auth/logout', {}, { withCredentials: true })
      .subscribe({
        next: () => {
          this.clearAuthState();
        },
        error: () => {
          this.clearAuthState();
          localStorage.setItem('logoutTest', '');
        },
      });
  }

  private clearAuthState() {
    this._currentUser.next(null);
    this._isAuthenticated.next(false);
    localStorage.removeItem('currentUser');
  }
}
