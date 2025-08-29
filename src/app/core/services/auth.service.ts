import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  login(code: string) {
    return this.http.post('/api/auth/login', { code }).pipe(
      tap(() => {})
    );
  }

  logout() {
    localStorage.removeItem('currentUser');
    return this.http.post('/api/auth/logout', {}); 
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('currentUser');
  }
}
