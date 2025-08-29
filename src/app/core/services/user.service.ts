import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../shared/models/user.model';
import { USER_MOCK } from '../../mocks/users.mock';


@Injectable({ providedIn: 'root' })

export class UserService {

  private _currentUser = signal<User | null>(null);
  public currentUser = this._currentUser.asReadonly();

  constructor(private http: HttpClient) {
    const stored = localStorage.getItem('currentUser');
    if (stored) {
      this._currentUser.set(JSON.parse(stored));
    }
  }

  getCurrentUser() {
    if (this._currentUser()) return this._currentUser();

    /*this.http.get<User>('/api/me').subscribe(user => {
      this.setCurrentUser(user);
    });*/ // - waiting for the api x_x

    const user = USER_MOCK;
    this.setCurrentUser(user);
    return user;
  }

  setCurrentUser(user: User) {
    this._currentUser.set(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  clearCurrentUser() {
    this._currentUser.set(null);
    localStorage.removeItem('currentUser');
  }
}
